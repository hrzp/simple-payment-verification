function UserController(userService) {
  return {
    async login(req, res, next) {
      let result = await userService.login(req.body.ssn, req.body.password);
      console.log('result',result)
      res.status(200).send(result);
    },
    async register(req, res, next) {
      let result = await userService.register(req.body.ssn, req.body.password);
      res.status(200).send(result);
    },
    async submit(req, res, next) {
      let result = await userService.submit(req.body);
      res.status(200).send(result);
    },
    async getAsset(req, res, next) {
      let result = await userService.getAsset(req.body);
      res.status(200).send(result);
    }
  };
}

module.exports = UserController;
