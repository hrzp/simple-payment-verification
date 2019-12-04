const bitcoin = require("bitcoinjs-lib");
var bitcoinMessage = require("bitcoinjs-message");

module.exports = knex => {
  return {
    async insertTransaction(transaction) {
      const result = await knex("transaction")
        .returning("*")
        .insert(transaction);
      return result;
    },
    async getTransaction() {
      console.log(res);
    }
  };
};
