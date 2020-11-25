module.exports = app =>{
    const { existsOrError } = app.api.Validator
    
    const save = async (req, res) =>{
        const data = { ...req.body }
        if(req.params.id) data.id = req.params.id

        try {
            existsOrError(data.task, 'Titulo não informado')
            existsOrError(data.comment, 'Descrição não informado')
            existsOrError(data.activityId, 'ID tarefa não informada')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        if(data.id) {
            app.db('tasks')
                .update(data)
                .where({ id: data.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('tasks')
                .insert(data)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('tasks')
            .select()
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('tasks')
            .select()
            .where({id: req.params.id})
            .then(task => res.json(task))
            .catch(err => res.status(500).send(err))
    }
    const completedTaskMark = (req, res) => {
        app.db('tasks')
            .update({ concluded: data.concluded })
            .where({ id: data.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }


    return {save, get, getById, completedTaskMark}
}