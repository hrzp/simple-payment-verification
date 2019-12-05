const bitcoin = require("bitcoinjs-lib");

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
    async getSSN(ssn) {
      let user = await knex("user")
        .where({ ssn: ssn })
        .first()
        .select(["id", "ssn"])
        .then(row => row);
      return user;
    },
    async getAsset(address) {
      let user = await knex("user")
        .where({ address: address })
        .first()
        .select(["id", "asset"])
        .then(row => row);
      return user;
    },
    async insertUser(ssn, password) {
      const keyPair = bitcoin.ECPair.makeRandom();
      const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      let user = await knex("user")
        .returning("*")
        .insert({
          ssn: ssn,
          password: password,
          private_key: keyPair.toWIF(),
          address: address
        })
        .then(row => row)
        .catch(function(err) {
          return { error: err.detail };
        });
      // TODO: catch errors
      return user;
    },
    async submitUser(userInfo) {
      let user = await knex("user")
        .insert({
          ssn: userInfo.ssn,
          password: userInfo.password,
          private_key: userInfo.privateKey,
          address: userInfo.address
        })
        .then(row => row)
        .catch(function(err) {
          return { error: err.detail };
        });
      return user;
    }
  };
};
