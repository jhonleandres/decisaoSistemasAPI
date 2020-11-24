const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../api-docs/swagger.json')

module.exports = app => {
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument));
}