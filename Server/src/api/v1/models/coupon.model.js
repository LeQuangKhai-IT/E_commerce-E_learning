"use strict";
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Coupon must have a name'],
        uppercase: true,
    },
    discount: {
        type: Number,
        min: [1, 'Discount must be greater than 1%'],
        max: [100, 'Discount must be less than or equal 100%'],
        required: [true, 'Discount is required'],
    },
    ended_at: {
        type: Date,
        default: Date.now() + 3000 * 3600 * 24,
    },
}, { timestamps: true });

module.exports = mongoose.model('coupon', couponSchema);