class Response {
  constructor() {
    this.hasError = false;
    this.error = null;
    this.payload = null;
  }
  error(error, payload = null) {
    this.hasError = true;
    this.error = error;
    this.payload = payload;
  }
  success(payload) {
    this.hasError = false;
    this.payload = payload;
  }
}

module.exports = Response;
