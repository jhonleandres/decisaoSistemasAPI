
module.exports = app => {
    app.post('/signin', app.api.AuthController.signin)
    app.post('/validateToken', app.api.AuthController.validateToken)

    app.route('/activity')
        // .all(app.api.passport.authenticate())
        .post(app.api.ActivityController.save)
        .get(app.api.ActivityController.get)
        .get(app.api.ActivityController.getById)
        
    app.route('/activity/task')
        // .all(app.api.passport.authenticate())
        .post(app.api.TaskController.save)
        .get(app.api.TaskController.get)
        .get(app.api.TaskController.getById)
}