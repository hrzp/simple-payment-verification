var userRouter = require("./user");
var transactionRouter = require("./transaction");

module.exports = (app, context) => {
  app.use("/user", userRouter(context.userController));
  app.use("/transaction", transactionRouter(context.transactionController));
};
