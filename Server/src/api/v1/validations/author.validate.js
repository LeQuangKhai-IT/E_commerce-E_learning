"use strict";
const joi = require('joi');

const authorValidate = data => {
    const authorSchema = joi.object({
        name: joi.string().min(2).max(20).trim().required(),
        job_title: joi.string().min(10).max(200).trim().required(),
        image: joi.string().pattern(new RegExp('/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i')).required(),
        url: joi.string(),
        website: joi.string(),
        course_label: joi.string().trim(),
        info: joi.string().min(5).required(),
        avg_rating: joi.number(),
        num_members: joi.number(),
        num_reivews: joi.number(),
    });
    return authorSchema.validate(data);
}

module.exports = {
    authorValidate
};