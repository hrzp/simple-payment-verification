var createError = require("http-errors");
const status = require("../config/status-codes");

module.exports = app => {
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err.message, "+-+-");
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res
      .status(err.status || status.SERVER_ERROR)
      .send({ message: "Server error", hasError: true, data: { err } });
    // res.render("error");
  });
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    // next(createError(404));
    res
      .status(status.NOT_FOUND)
      .send({ message: "Not Found", hasError: true, data: {} });
  });
  app.use(function(err, req, res, next) {
    console.error(err, "++++++++++++++++++++++++++++++++++++++");
    res.status(400).send("Something broke!");
  });
};
