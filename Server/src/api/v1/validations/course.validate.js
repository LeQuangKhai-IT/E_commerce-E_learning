"use strict";
const joi = require('joi');

const courseValidate = data => {
    const courseSchema = joi.object({
        name: joi.string().min(10).max(100).trim().required(),
        url: joi.string(),
        is_paid: joi.boolean(),
        price: joi.number(),
        concurrency: joi.string(),
        discount: joi.number(),
        headline: joi.string().trim().min(5).max(200).required(),
        num_members_enrolled: joi.number(),
        avg_rating: joi.number(),
        num_reviews: joi.number(),
        num_lectures: joi.number().min(1),
        image: joi.string().required().pattern(new RegExp('/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i')),
        language: joi.string().required(),
        caption_languages: joi.array().items(joi.string()),
        level: joi.string().valid('Beginner', 'Intermediate', 'Expert', 'All levels').required(),
        estimate_content_length: joi.string(),
        requirements: joi.array().items(joi.string()),
        description: joi.string().required(),
        slug: joi.string(),
        objectives: joi.array().items(joi.string()),
        incentives_list: joi.array().items(joi.string()),
    });
    return courseSchema.validate(data);
}

module.exports = {
    courseValidate
};