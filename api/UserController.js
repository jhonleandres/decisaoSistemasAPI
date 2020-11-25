const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.Validator
    
    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) =>{
        const data = { ...req.body }
        if(req.params.id) data.id = req.params.id

        try {
            existsOrError(data.user, 'Login não informado')
            existsOrError(data.password, 'Senha não informado')
            existsOrError(data.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(data.password, data.confirmPassword,
                'Senhas não conferem')
            existsOrError(data.fistname, 'Nome não informado')
            existsOrError(data.last_name, 'Sobre Nome não informado')
            const userFromDB = await app.db('users')
                .where({ user: data.user }).first()
            if(!data.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        data.password = encryptPassword(data.password)
        delete data.confirmPassword

        if(data.id) {
            app.db('users')
                .update(data)
                .where({ id: data.id })
                .where('active', 'Y')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(data)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('user', 'password', 'fistname', 'last_name', 'active')
            .where('active', 'Y')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('user', 'password', 'fistname', 'last_name', 'active')
            .where({id: req.params.id})
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }
    const updateActive = (req, res) => {
        app.db('users')
            .update({ active: data.active })
            .where({ id: data.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }


    return {save, get, getById, updateActive}
}