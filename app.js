var express = require("express");

var appConfig = require("./src/config/app");
var appErrorHandler = require("./src/config/error-handlers");
const routeConfig = require("./src/routes");
var context = require("./src/common/context");

var app = express();

appConfig(app, express);
routeConfig(app, context);
appErrorHandler(app);

module.exports = app;
