"use strict";
const joi = require('joi');

const userValidate = data => {
    const userSchema = joi.object({
        email: joi.string().min(11).max(32).email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).lowercase().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,32}$')).required(),
        firstname: joi.string().min(2).max(20).trim().required(),
        lastname: joi.string().min(2).max(20).trim().required(),
        avatar: joi.string().pattern(new RegExp(/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i)),
        headline: joi.string().min(10).max(200).trim(),
        role: joi.string().valid('admin', 'author', 'member')
            .when('role', {
                is: 'author', then: joi.object({
                    job_title: joi.string().min(10).max(200).trim().required(),
                    url: joi.string(),
                    course_label: joi.string().trim(),
                    avg_rating: joi.number(),
                    num_members: joi.number(),
                    num_reivews: joi.number(),
                })
            })
            .when(),
        website: joi.string(),
        resetPasswordToken: joi.string().trim(),
        resetPasswordExpire: joi.date(),
        day: joi.number(),
        month: joi.number(),
        year: joi.number(),
    });
    return userSchema.validate(data);
}

module.exports = {
    userValidate
};