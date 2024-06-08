'use strict';
const createHttpError = require('http-errors');
const User = require('../models/user.model');
const valid = require('../validations/user.validate');

const getUsers = async () => {
    return await User.find({}).exec();
}
const getUser = async (req) => {
    const id = req.params.id;
    return await User.findById({ _id: id }).exec();
}
const createUser = async (req) => {
    const { email } = req.body;
    const { _id, ...data } = req.body;
    const { error } = valid.userValidate(data);
    if (error) {
        throw createHttpError(error.details[0].message);
    };
    const isExits = await User.findOne({
        email
    });
    if (isExits) {
        throw createHttpError.Conflict(`User ${email} is exits!`);
    }
    const userModel = new User(data);
    const userSave = await userModel.save();
    return userSave;
}
const updateUser = async (req) => {
    const { error } = valid.userValidate(req.body);
    if (error) {
        throw createHttpError(error.details[0].message);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body).exec();
    return user;
}
const deleteUser = async (req) => {
    const user = await User.findOneAndDelete({ _id: req.params.id }).exec();
    return user;
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
