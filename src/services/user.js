const status = require("../config/status-codes");
const BaseService = require("./base");

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
      this.responseHandler.setSuccessfulStatus(result);
    }
    return this.responseHandler;
  }
}

module.exports = UserService;
