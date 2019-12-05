function UserController(userService) {
  return {
    async login(req, res, next) {
      let result = await userService.login(req.body.ssn, req.body.password);
      res.status(result.statusCode).send(result);
    },
    async register(req, res, next) {
      let result = await userService.register(req.body.ssn, req.body.password);
      res.status(result.statusCode).send(result);
    },
    async submit(req, res, next) {
      let result = await userService.submit(req.body);
      res.status(result.statusCode).send(result);
    }
  };
}

module.exports = UserController;
