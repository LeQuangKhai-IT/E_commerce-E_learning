"use strict";

const joi = require('joi');

const loginValidate = data => {
    const userSchema = joi.object({
        email: joi.string().min(11).max(32).email().lowercase().required(),
        password: joi.string().min(6).required(),
    });
    return userSchema.validate(data);
}

const registerValidate = data => {
    const userSchema = joi.object({
        email: joi.string().min(11).max(32).email().lowercase().required(),
        password: joi.string().min(6).required(),
        username: joi.string().min(6).max(20).required(),
    });
    return userSchema.validate(data);
}

module.exports = {
    loginValidate,
    registerValidate
};