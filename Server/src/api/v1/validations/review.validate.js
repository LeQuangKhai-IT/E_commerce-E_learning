"use strict";
const joi = require('joi');

const reviewValidate = data => {
    const reviewSchema = joi.object({
        content: joi.string().required(),
        content_html: joi.string(),
        rating: joi.number().required(),

    });
    return reviewSchema.validate(data);
}

module.exports = {
    reviewValidate
};