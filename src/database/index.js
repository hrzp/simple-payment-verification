const user = require("./user");
const createTables = require("./tabels");
const knex = require("knex")({
  client: "pg",
  useNullAsDefault: true,
  // TODO: read connection string data form config
  connection: "postgres://admin:1234@localhost:5432/unchain_db"
});

module.exports = {
  ...createTables(knex),
  ...user(knex)
};
