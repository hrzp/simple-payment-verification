const ResponseHandler = require("../common/utils/response-handler");
const status = require("../config/status-codes");
const Joi = require("joi");

const responseHandler = new ResponseHandler();

const jsonValidation = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;

    if (valid) {
      next();
      return;
    }
    const { details } = error;
    const message = details.map(i => i.message).join(",");
    responseHandler.setFailureStatus(
      "Unacceptable input",
      message,
      status.BAD_REQUEST
    );

    res.status(status.BAD_REQUEST).send(responseHandler);
  };
};
module.exports = jsonValidation;
