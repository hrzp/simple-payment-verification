const Joi = require("joi");

const register = {
  ssn: Joi.string()
    .min(10)
    .max(10)
    .required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
};

const submit = {
  signInfo: Joi.object({
    signature: Joi.string().required(),
    address: Joi.string().required(),
    message: Joi.string().required()
  }),
  userInfo: Joi.object({
    ssn: Joi.string().required(),
    password: Joi.string().required(),
    privateKey: Joi.string().required(),
    address: Joi.string().required()
  })
};

const login = {
  ssn: Joi.string()
    .min(10)
    .max(10)
    .required(),
  password: Joi.string()
    .min(8)
    .max(32)
    .required()
};

module.exports = { register, login, submit };
