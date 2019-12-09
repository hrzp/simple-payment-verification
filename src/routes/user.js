const jsonValidation = require("../middleware/jsonValidation");
const schemas = require("../json-schemas/user");
const express = require("express");
const router = express.Router();

module.exports = userController => {
  router.post("/login", jsonValidation(schemas.login), userController.login);
  router.post(
    "/register",
    jsonValidation(schemas.register),
    userController.register
  );
  router.post("/submit", jsonValidation(schemas.submit), userController.submit);
  router.post("/get-asset", jsonValidation(schemas.getAsset), userController.getAsset);
  return router;
};
