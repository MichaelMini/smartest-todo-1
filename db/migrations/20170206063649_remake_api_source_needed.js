exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("todos", function (table) {
      table.string("api_source");

    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("todos", function (table) {
      table.dropColumn("api_source")
    })
  ])
};
