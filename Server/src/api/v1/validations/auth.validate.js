"use strict";

const joi = require("joi");

const loginValidate = (data) => {
  const userSchema = joi.object({
    email: joi
      .string()
      .min(10)
      .max(32)
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .lowercase()
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,32}$"))
      .required(),
  });
  return userSchema.validate(data);
};

const emailValidate = (data) => {
  const userSchema = joi.object({
    email: joi
      .string()
      .min(10)
      .max(32)
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .lowercase()
      .required(),
  });
  return userSchema.validate(data);
};

const passwordValidate = (data) => {
  const userSchema = joi.object({
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,32}$"))
      .required(),
  });
  return userSchema.validate(data);
};

const registerValidate = (data) => {
  const userSchema = joi.object({
    email: joi
      .string()
      .min(11)
      .max(32)
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .lowercase()
      .required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,32}$"))
      .required(),
    fname: joi.string().min(2).max(20).trim().required(),
    lname: joi.string().min(2).max(20).trim().required(),
  });
  return userSchema.validate(data);
};

module.exports = {
  loginValidate,
  registerValidate,
  emailValidate,
  passwordValidate,
};
