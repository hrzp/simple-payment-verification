const ResponseHandler = require("../common/utils/response-handler");

class BaseService {
  constructor(db) {
    this.db = db;
    this.db.createTables();
    this.responseHandler = new ResponseHandler();
  }
}

module.exports = BaseService;
