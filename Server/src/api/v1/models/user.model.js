"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { connection } = require('../utils/connections_db');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        minlength: 11,
        maxlength: 32,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        select: false,
    },
    image: {
        type: String,
        match: [/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i, 'Invalid image type'],
    },
    headline: {
        type: String,
        minlength: [5, "Please write anything on here!"],
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'author'],
        default: 'student'
    },
}, { timestamps: true },);

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
