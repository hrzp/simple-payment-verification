const jsonValidation = require("../middleware/jsonValidation");
const schemas = require("../json-schemas/user");
const express = require("express");
const router = express.Router();

module.exports = userController => {
  router.get("/login", jsonValidation(schemas.login), userController.login);
  router.post(
    "/register",
    jsonValidation(schemas.register),
    userController.register
  );
  return router;
};
