exports.up = function (knex) {
    return knex.schema.createTable('tasks', (table) => {
      table.increments();
      table.string('task').notNullable();
      table.string('comment').notNullable();
      table.enu('active', ['Y','N']).defaultTo('Y').notNullable();
      table.enu('concluded', ['Y','N']).defaultTo('N').notNullable();
      table
        .integer('activity_id')
        .references('id')
        .inTable('activities');
      table.timestamps(false, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
  };