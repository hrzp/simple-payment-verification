const bitcoin = require("bitcoinjs-lib");
const bitcoinMessage = require("bitcoinjs-message");
const config = require("../config/node");
const Response = require("./base");
const Redis = require("../database/redis");
const utils = require("../common/utils/cryptos");

class Transaction {
  response = new Response();

  constructor(transaction) {
    this.transaction = transaction;
    this.redis = Redis;
  }

  async submit(db) {
    let haveEnoughAsset = await this.checkBalance(
      db,
      this.transaction.from,
      this.transaction.amount
    );
    if (!haveEnoughAsset) return { hasError: true, error: "Not enough fund" };
    if (!this.verifyTransaction(this.transaction)) {
      return { hasError: true, error: "Wrong signature" };
    }
    let message = this.createMessage(this.transaction);
    let hash = utils.calculateHash(message);
    this.redis.set(hash, JSON.stringify(this.transaction), 60);
    return {
      hasError: false,
      payload: {
        hash: hash,
        NodeSignature: this.signTransaction(hash),
        nodeAddress: config.address
      }
    };
  }

  readTransactionFromRedis(hash) {
    let result = this.redis.get(hash);
    return result;
  }

  createMessage(transaction) {
    return `${transaction.from}-${transaction.to}-${transaction.amount}-${transaction.nonce}`;
  }

  verifyTransaction(transaction) {
    let message = this.createMessage(transaction);
    return utils.verifyMessage(
      message,
      transaction.from,
      transaction.signature
    );
  }

  signTransaction(hash) {
    const keyPair = bitcoin.ECPair.fromWIF(config.privateKey);
    const privateKey = keyPair.privateKey;

    const signature = bitcoinMessage.sign(hash, privateKey, keyPair.compressed);
    return signature.toString("base64");
  }

  fakeSingnature(transaction) {
    const keyPair = bitcoin.ECPair.fromWIF(
      "L1Fqvu3doSPz2NpsCvqUiA7jetvyX1kgTDTYbgfF6yrQe8jWUei7"
    );
    const privateKey = keyPair.privateKey;
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
    transaction = {
      from: address,
      to: "167RqdrzA6h4VCGVJypYbhefvzyg7ymUj2",
      amount: 1,
      nonce: 1
    };
    var message = `${transaction.from}-${transaction.to}-${transaction.amount}-${transaction.nonce}`;
    var signature = bitcoinMessage.sign(
      message,
      privateKey,
      keyPair.compressed
    );
    transaction.signature = signature.toString("base64");
    return transaction;
  }

  async checkBalance(db, address, amount) {
    let result = await db.getAsset(address);
    if (!result.asset >= amount) {
      return false;
    }
    return true;
  }

  verifyNodesSignature(hash, nodes) {
    for (let node of nodes) {
      if (!config.nodes.includes(node.address)) {
        return false;
      }
      if (!utils.verifyMessage(hash, node.address, node.signature)) {
        return false;
      }
    }
    return true;
  }

  getTransactionFromRedis(hash) {
    let transaction = this.redis.get(hash);
    if (!transaction) {
      return false;
    }
    return JSON.parse(transaction);
  }

  async approval(db, data) {
    if (data.nodes.length < 3) {
      this.response.error(
        "Invalid request. You need 3 node to verify your transaction"
      );
      return this.response;
    }
    if (!this.verifyNodesSignature(data.hash, data.nodes)) {
      this.response.error("Invalid Nodes signature");
      return this.response;
    }

    let transaction = await this.getTransactionFromRedis(hash);
    if (!transaction) {
      this.response.error("You are too late");
      return this.response;
    }

    let message = this.createMessage(transaction);
    transaction.hash = utils.calculateHash(message);
    transaction.node_signature = JSON.stringify(data.nodes);
    let result = await db.insertTransaction(transaction);
    this.response.success(result);
    return this.response;
  }
}

module.exports = {
  Transaction
};
