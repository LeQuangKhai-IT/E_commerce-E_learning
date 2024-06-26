"use strict";
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
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
    section: {
        type: String,
        required: true,
    },
    section_item: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
        default: '00:00:00',
    },
});

module.exports = mongoose.model('progress', progressSchema);