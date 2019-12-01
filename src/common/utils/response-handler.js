const status = require("../../config/status-codes");

class ResponseHandler {
  constructor() {
    this.hasError = false;
    this.payload = null;
    this.message = "";
    this.errors = null;
    this.statusCode = 200;
  }

  setSuccessfulStatus(data, message, statusCode = status.SUCCESS) {
    this.hasError = false;
    this.payload = data;
    this.message = message;
    this.statusCode = statusCode;
  }

  setFailureStatus(errors, message, statusCode = status.SUCCESS) {
    this.hasError = true;
    this.payload = null;
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

module.exports = ResponseHandler;
