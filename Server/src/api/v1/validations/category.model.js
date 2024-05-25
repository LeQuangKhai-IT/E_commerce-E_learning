"use strict";
const joi = require('joi');

const categoryValidate = data => {
    const categorySchema = joi.object({
        title: joi.string().min(5).max(100).trim().required(),
        url: joi.string().required(),
        slug: joi.string(),
    });
    return categorySchema.validate(data);
}

module.exports = {
    categoryValidate
};