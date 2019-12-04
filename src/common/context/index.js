const db = require("../../database");

const UserService = require("../../services/user");
const UserController = require("../../controller/user");

const TransactionService = require("../../services/transaction");
const TransactionController = require("../../controller/transaction");

const userService = new UserService(db);
const userController = UserController(userService);

const transactionService = new TransactionService(db);
const transactionController = TransactionController(transactionService);

module.exports = {
  userController,
  transactionController
};
