module.exports = knex => {
  return {
    async createTables() {
      await knex.schema.hasTable("user").then(function(exists) {
        if (!exists) {
          return knex.schema.createTable("user", function(table) {
            table.increments("id").primary();
            table.string("ssn", 10).unique();
            table.string("password", 128);
            table.string("first_name", 128);
            table.string("last_name", 128);
            table.string("private_key", 256).unique();
            table.string("address", 256).unique();
            table
              .integer("asset")
              .unsigned()
              .defaultTo(0);
            table.timestamps();
            table.timestamp("create_at");
          });
        }
      });
      await knex.schema.hasTable("transaction").then(function(exists) {
        if (!exists) {
          return knex.schema.createTable("transaction", function(table) {
            table.increments("id").primary();
            table.string("hash", 64).unique();
            table.integer("from");
            table.integer("to");
            table.integer("amount").unsigned();
            table.integer("nonce");
            table.string("signature", 512).unique();
            table.string("node_signature", 1024);
            table.timestamp("create_at");

            table.foreign("from").references("user.id");
            table.foreign("to").references("user.id");
          });
        }
      });
    }
  };
};
