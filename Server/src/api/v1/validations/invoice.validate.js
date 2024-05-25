"use strict";
const joi = require('joi');

const invoiceValidate = data => {
    const invoiceSchema = joi.object({
        day: joi.number(),
        month: joi.number(),
        year: joi.number(),
        total_price: joi.number(),
        payment_method: joi.string().required(),
    });
    return invoiceSchema.validate(data);
}

module.exports = {
    invoiceValidate
};