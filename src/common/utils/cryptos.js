const crypto = require("crypto");
const bitcoin = require("bitcoinjs-lib");
const bitcoinMessage = require("bitcoinjs-message");

function verifyMessage(message, address, signature) {
  try {
    return bitcoinMessage.verify(message, address, signature);
  } catch (error) {
    return false;
  }
}

function signMessage(message, pv) {
  const keyPair = bitcoin.ECPair.fromWIF(pv);
  const privateKey = keyPair.privateKey;
  const signature = bitcoinMessage.sign(
    message,
    privateKey,
    keyPair.compressed
  );
  return signature.toString("base64");
}

function calculateHash(text) {
  return crypto
    .createHash("sha256")
    .update(text, "utf8")
    .digest("hex");
}

module.exports = {
  verifyMessage,
  signMessage,
  calculateHash
};
