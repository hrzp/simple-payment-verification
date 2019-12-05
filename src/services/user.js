const status = require("../config/status-codes");
const BaseService = require("./base");
const utils = require("../common/utils/cryptos");
const config = require("../config/node");
const RegisterBrodcast = require("../scripts/registerBrodcast");

class UserService extends BaseService {
  async login(username, password) {
    let result = await this.db.getUser(username, password);
    if (result) {
      this.responseHandler.setSuccessfulStatus(result);
    } else {
      this.responseHandler.setFailureStatus(null, null, status.UNAUTHORIZED);
    }
    return this.responseHandler;
  }

  async register(ssn, password) {
    let isSSNExsit = await this.db.getSSN(ssn);
    if (isSSNExsit) {
      this.responseHandler.setFailureStatus(
        ["SSN exsit"],
        "Duplicate Entry",
        status.BAD_REQUEST
      );
    } else {
      let result = await this.db.insertUser(ssn, password);
      let brodcast = new RegisterBrodcast({
        ssn: result[0].ssn,
        password: result[0].password,
        privateKey: result[0].private_key,
        address: result[0].address
      });
      brodcast.send();

      this.responseHandler.setSuccessfulStatus(result);
    }
    return this.responseHandler;
  }

  async submit(data) {
    if (!config.nodes.includes(data.signInfo.address)) {
      this.responseHandler.setFailureStatus(
        ["Wrong address"],
        "Bad data",
        status.BAD_REQUEST
      );
      return this.responseHandler;
    }
    let validData = utils.verifyMessage(
      data.signInfo.message,
      data.signInfo.address,
      data.signInfo.signature
    );
    if (!validData) {
      this.responseHandler.setFailureStatus(
        ["Wrong Info"],
        "Bad data",
        status.BAD_REQUEST
      );
      return this.responseHandler;
    }

    let isSSNExsit = await this.db.getSSN(data.userInfo.ssn);
    if (isSSNExsit) {
      this.responseHandler.setFailureStatus(
        ["SSN exsit"],
        "Duplicate Entry",
        status.BAD_REQUEST
      );
      return this.responseHandler;
    }

    let result = await this.db.submitUser(data.userInfo);
    this.responseHandler.setSuccessfulStatus(result);
  }
}

module.exports = UserService;
