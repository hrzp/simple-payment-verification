const bitcoin = require("bitcoinjs-lib");
var bitcoinMessage = require("bitcoinjs-message");

module.exports = knex => {
  return {
    async getUser(ssn, password) {
      let user = await knex("user")
        .where({
          ssn: ssn,
          password: password
        })
        .first()
        .select(["id", "ssn", "address"])
        .then(row => row);
      return user;
    },
    async insertUser(ssn, password) {
      const keyPair = bitcoin.ECPair.makeRandom();
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      let user = await knex("user")
        .returning("id", "asset", "address")
        .insert({
          ssn: ssn,
          password: password,
          private_key: keyPair.toWIF(),
          address: address
        })
        .then(row => row);
      // TODO: catch errors
      return user;
    }
  };
};
