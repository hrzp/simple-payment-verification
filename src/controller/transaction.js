function TransactionController(transactionService) {
  return {
    async submit(req, res, next) {
      try {
        let result = await transactionService.submit(req.body);
        res.status(200).send(result);
      } catch (error) {
        console.log(error);
        next(error);
      }
    },
    async approval(req, res, next) {
      let result = await transactionService.approval(
        req.body.ssn,
        req.body.password
      );
      res.status(result.statusCode).send(result);
    }
  };
}

module.exports = TransactionController;
