const db = require("../../database");

const UserService = require("../../services/user");
const UserController = require("../../controller/user");

const userService = new UserService(db);
const userController = UserController(userService);

module.exports = {
  userController
};
