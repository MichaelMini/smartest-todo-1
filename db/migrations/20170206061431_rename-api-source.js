exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("todos", function (table) {
      table.renameColumn("api_source", "todo_query")

    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("todos", function (table) {
      table.renameColumn("todo_query", "api_source")

    })
  ])
};
