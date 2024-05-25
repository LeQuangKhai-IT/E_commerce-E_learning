"use strict";
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'A reivew must have a content'],
    },
    content_html: String,
    rating: {
        type: Number,
        required: [true, 'Please rate the course'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'course',
        required: true,
    },
}, { timestamps: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate('user');
    next();
});

module.exports = mongoose.model('review', reviewSchema);