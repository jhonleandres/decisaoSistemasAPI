const {db} = require('./.env')
const { FsMigrations } = require('knex/lib/migrate/sources/fs-migrations')

module.exports = {
    development: {
      client: 'pg',
      connection: db,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        migrationSource: new FsMigrations('./migrations', false)
      },
      seeds: {
        directory: './seeds'
      }
    },
    production: {
      client: 'pg',
      connection: db,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        migrationSource: new FsMigrations('./migrations', false)
      },
      seeds: {
        directory: './seeds'
      }
    }
};
