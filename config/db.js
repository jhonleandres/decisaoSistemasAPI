const {environment} = require('../.env')
const config = require('../knexfile')[environment]
const knex = require('knex')(config)

knex.migrate.latest([config])
module.exports = knex