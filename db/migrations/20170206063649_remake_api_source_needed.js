exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("todos", function (table) {
      table.string("api-source");

    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("todos", function (table) {
      table.dropColumn("api-source")
    })
  ])
};
