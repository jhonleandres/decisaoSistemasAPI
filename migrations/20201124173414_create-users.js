exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('user').notNullable().comment('Login');
      table.string('password').notNullable().comment('Password');      
      table.string('fistname').notNullable().comment('Nome');
      table.string('last_name').notNullable().comment('Sobrenome');
      table.enu('active', ['Y','N']).defaultTo('Y').notNullable();
      table.timestamps(false, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };