"use strict";
const joi = require('joi');

const topicValidate = data => {
    const topicSchema = joi.object({
        title: joi.string().trim().min(2).max(100).required(),
        url: joi.string().required(),
    });
    return topicSchema.validate(data);
}

module.exports = {
    topicValidate
};