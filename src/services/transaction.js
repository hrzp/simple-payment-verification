const status = require("../config/status-codes");
const BaseService = require("./base");
const script = require("../scripts/transaction");

class TransactionService extends BaseService {
  async submit(transaction) {
    let trx = new script.Transaction(transaction);
    let result = await trx.submit(this.db);
    if (result.hasError) {
      this.responseHandler.setFailureStatus(result.error, result.error);
    } else {
      this.responseHandler.setSuccessfulStatus(result.payload);
    }
    return this.responseHandler;
  }

  async approval(ssn, password) {
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

module.exports = TransactionService;
