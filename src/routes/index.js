var userRouter = require("./user");

module.exports = (app, context) => {
  app.use("/user", userRouter(context.userController));
};
