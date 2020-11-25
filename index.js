const app = require('express')()
const consign = require('consign')
const db = require('./config/db');
const port = process.env.PORT || 3333

app.db = db

consign()
    .include('./src/config/passport.js')
    .include('./config/middlewares.js')
    .then('./config/docSwagger.js')
    .then('./api/Validator.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log('Backend executando...')
})