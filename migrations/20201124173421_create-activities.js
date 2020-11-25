exports.up = function (knex) {
    return knex.schema.createTable('activities', (table) => {
      table.increments();
      table.string('titule').notNullable();
      table.string('descrition').notNullable();
      table.enu('active', ['Y','N']).defaultTo('Y').notNullable();
      table.enu('concluded', ['Y','N']).defaultTo('N').notNullable();
      table
        .integer('user_id')
        .references('id')
        .inTable('users');
      table.timestamps(false, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('activities');
  };