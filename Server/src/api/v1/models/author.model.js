"use strict";
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Author must have a name'],
    },
    job_title: {
        type: String,
        required: [true, 'Please describe your job'],
        trim: true,
        maxlength: [200, 'Job title must less than or equal 200 characters'],
        minlength: [10, 'Job title must greater than 10 characters'],
    },
    image: {
        type: String,
        required: [true, 'A course must have an image'],
        match: [/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i, 'Invalid image type'],
    },
    avg_rating: Number,
    url: String,
    num_members: Number,
    num_reivews: Number,
    course_label: String,
    info: {
        type: String,
        required: [true, 'Please write something about you'],
        minlength: [5, 'Info must be greater than 5 characters'],
    },
    website: String,
}, { timestamps: true });

module.exports = mongoose.model('author', authorSchema);