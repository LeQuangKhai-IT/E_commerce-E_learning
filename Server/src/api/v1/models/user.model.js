"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { connection } = require('../utils/connections_db');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    fname: {
        type: String,
        trim: true,
        minlength: [2, 'Firstname must be greater than 6 characters '],
        maxlength: [20, 'Firstname must be less than or equal 20 characters'],
        required: [true, 'Please enter your firstname'],
    },
    lname: {
        type: String,
        trim: true,
        minlength: [2, 'Lastname must be greater than 2 characters '],
        maxlength: [20, 'Lastname must be less than or equal 20 characters'],
        required: [true, 'Please enter your Lastname'],
    },
    avatar: {
        type: String,
        match: [/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i, 'Invalid image type'],
    },
    headline: {
        type: String,
        trim: true,
        maxlength: [
            200,
            "User's headline must be less than or equal 200 characters",
        ],
        minlength: [10, "User's headline must be greater than 10 characters"],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        trim: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ]
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Please add a password'],
        select: false,
    },

    role: {
        type: String,
        enum: ['member', 'admin'],
        default: 'member'
    },
    website: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    day: Number,
    month: Number,
    year: Number,
    payment: new mongoose.Schema({
        name_on_card: {
            type: String,
            required: true,
        },
        card_number: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        security_code: {
            type: Number,
            require: true,
            max: 3,
            min: 3,
        },
        type: {
            type: String,
            required: true,
        },
    }),
    enrolled_courses: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'course',
            },
        ],
    },
    cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'course',
        },
    ],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        return error;
    }
}
const User = connection.model('users', UserSchema);
module.exports = User;
