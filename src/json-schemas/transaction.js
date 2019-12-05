const Joi = require("joi");

const submit = {
  from: Joi.string().required(),
  to: Joi.string().required(),
  amount: Joi.number()
    .min(1)
    .required(),
  nonce: Joi.number().required(),
  signature: Joi.string().required()
};

const approval = {
  nodesSignatures: Joi.array().items(Joi.string()),
  hash: Joi.string().required()
};

module.exports = { submit, approval };
