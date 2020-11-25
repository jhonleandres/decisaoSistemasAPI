module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.Validator
    
    const save = async (req, res) =>{
        const data = { ...req.body }
        if(req.params.id) data.id = req.params.id

        try {
            existsOrError(data.titule, 'Titulo não informado')
            existsOrError(data.descrition, 'Descrição não informado')
            existsOrError(data.userId, 'ID usuário não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(data.id) {
            app.db('activities')
                .update(data)
                .where({ id: data.id })
                .where('active', 'Y')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('activities')
                .insert(data)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('activities')
            .select()
            .where('active', 'Y')
            .then(activities => res.json(activities))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('activities')
            .select()
            .where({id: req.params.id})
            .then(activities => res.json(activities))
            .catch(err => res.status(500).send(err))
    }
    const completedActivityMark = (req, res) => {
        app.db('activities')
            .update({ concluded: data.concluded })
            .where({ id: data.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }


    return {save, get, getById, completedActivityMark}
}