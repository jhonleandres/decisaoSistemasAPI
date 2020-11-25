const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.login || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.baseDb('users')
            .where({ login: req.body.login })
            .first()

        if (!user) return res.status(400).send('Usuário não encontrado!')

        try {
            isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) return res.status(401).send('Usuário/Senha inválidos!')
        }
        catch(error){
            return res.status(500).send(error)
        }

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            login: user.login,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userToken = req.headers['x-access-token'] || req.body.token || req.query.token
        try {
            if(userToken) {
                const token = jwt.decode(userToken, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}