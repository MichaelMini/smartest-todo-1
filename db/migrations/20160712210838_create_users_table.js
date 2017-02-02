exports.up = function(knex, Promise) {
  return Promise.all([
    /* CREATE users table */
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('user_name');
      table.string('password');
    }),
    /* CREATE todos table */
    knex.schema.createTable('todos', function (table) {
      table.increments();
      table.string('todo_item');
      table.string('todo_catagory');
      table.string('api_source');
      table.string('done_status');
      table.integer('user_id').references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.dropTable('users'),

    knex.schema.dropTable('todos'),

  ]);
};
