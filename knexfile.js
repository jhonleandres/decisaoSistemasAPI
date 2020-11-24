const {db} = require('./.env')
const { FsMigrations } = require('knex/lib/migrate/sources/fs-migrations')

module.exports = {
    development: {
      client: 'mysql2',
      connection: db,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        migrationSource: new FsMigrations('./database/migrations', false)
      },
      seeds: {
        directory: './database/seeds'
      }
    },
    production: {
      client: 'mysql2',
      connection: db,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
        migrationSource: new FsMigrations('./database/migrations', false)
      },
      seeds: {
        directory: './database/seeds'
      }
    }
};
