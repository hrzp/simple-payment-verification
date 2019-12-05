const utils = require("../common/utils/cryptos");
const config = require("../config/node");
const axios = require("axios");

/* 
    In this class, we send the user's data to other nodes.
    they get data with a signature and should submit it.
    For now, just sending data and don't wait for a response.
*/

class Broadcast {
  constructor(userInfo) {
    this.userInfo = userInfo;
  }
  send() {
    let signInfo = this.createSign();
    for (let url of config.nodesUrl) {
      this.sendTo(url + "/user/submit", signInfo);
    }
  }
  sendTo(url, signInfo) {
    axios
      .post(url, {
        signInfo: signInfo,
        userInfo: this.userInfo
      })
      .then(res => {})
      .catch(error => {});
  }
  createSign() {
    let randomString = Math.random().toString();
    let signature = utils.signMessage(randomString, config.privateKey);
    return {
      message: randomString,
      signature: signature,
      address: config.address
    };
  }
}

module.exports = Broadcast;
