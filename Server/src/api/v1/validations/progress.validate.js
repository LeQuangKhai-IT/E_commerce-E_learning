"use strict";
const joi = require('joi');

const invoiceValidate = data => {
    const invoiceSchema = joi.object({
        section: joi.string().required(),
        section_item: joi.string().required(),
        time: joi.string().required(),

    });
    return invoiceSchema.validate(data);
}

module.exports = {
    invoiceValidate
};