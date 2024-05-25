"use strict";
const joi = require('joi');

const userValidate = data => {
    const userSchema = joi.object({
        email: joi.string().min(11).max(32).email().lowercase().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,32}$')).required(),
        fname: joi.string().min(2).max(20).trim().required(),
        lname: joi.string().min(2).max(20).trim().required(),
        avatar: joi.string().pattern(new RegExp('/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i')).trim(),
        headline: joi.string().min(10).max(200).trim(),
        role: joi.string().valid('admin', 'member'),
        website: joi.string().trim(),
        resetPasswordToken: joi.string().trim(),
        resetPasswordExpire: joi.date().trim(),
        day: joi.number(),
        month: joi.number(),
        year: joi.number(),
    });
    return userSchema.validate(data);
}

module.exports = {
    userValidate
};