
module.exports = app => {
    app.route('/ims')
        .post(app.api.ImController.save)
        .get(app.api.ImController.get)
    app.route('/ims/:id')
        .post(app.api.ImController.save)
        .get(app.api.ImController.getById)
    app.route('/close')
        .get(app.api.ImController.getImsClose) 
    app.route('/close/:id')
        .get(app.api.ImController.getImsCloseById)     
    app.route('/folowup')
        .post(app.api.folowUpController.save)
    app.route('/folowup/:id/all')
        .get(app.api.folowUpController.get)
    app.route('/folowup/:id')
        .get(app.api.folowUpController.getById)

        
}