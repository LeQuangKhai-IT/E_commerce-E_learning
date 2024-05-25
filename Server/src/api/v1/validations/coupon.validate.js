"use strict";
const joi = require('joi');

const couponValidate = data => {
    const couponSchema = joi.object({
        name: joi.string().trim().uppercase().required(),
        discount: joi.number().min(1).max(100).required(),
        ended_at: joi.date(),
    });
    return couponSchema.validate(data);
}

module.exports = {
    couponValidate
};