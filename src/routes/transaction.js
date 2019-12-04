const jsonValidation = require("../middleware/jsonValidation");
const schemas = require("../json-schemas/transaction");
const express = require("express");
const router = express.Router();

module.exports = transactionController => {
  router.post(
    "/submit",
    jsonValidation(schemas.submit),
    transactionController.submit
  );
  router.get(
    "/approval",
    jsonValidation(schemas.approval),
    transactionController.approval
  );

  return router;
};
