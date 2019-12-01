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

module.exports = { register, login };
