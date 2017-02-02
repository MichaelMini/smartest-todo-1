exports.up = function(knex, Promise) {
  // return knex.schema.createTable('users', function (table) {
  //   table.increments();
  //   table.string('user_name');
  //   table.string('password');
  // }),
  // knex.schema.createTable('todos', function (table) {
  //   table.increments();
  //   table.string('user_id');
  //   table.string('todo_item');
  //   table.string('todo_catagory');
  //   table.string('api_source');
  //   table.string('done_status');
  // });
  return Promise.all([
    // knex.raw('SET foreign_key_checks = 0;'),

    /* CREATE Member table */
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('user_name');
      table.string('password');
    }),

    /* CREATE Address table */
    knex.schema.createTable('todos', function (table) {
      table.increments();
      table.string('todo_item');
      table.string('todo_catagory');
      table.string('api_source');
      table.string('done_status');
      table.integer('user_id').references('id').inTable('users');
    }),

    // knex.raw('SET foreign_key_checks = 1;')
  ]);
};

exports.down = function(knex, Promise) {
  // return knex.schema.dropTable('todos');
  return Promise.all([
    // knex.raw('SET foreign_key_checks = 0;'),

    knex.schema.dropTable('users'),

    knex.schema.dropTable('todos'),

    // knex.raw('SET foreign_key_checks = 1;')

  ]);
};
