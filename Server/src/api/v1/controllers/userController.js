'use strict';

const createHttpError = require('http-errors');
const User = require('../models/user.model');
const valid = require('../validations/authValidatetion');

const getUsers = async (req, res, next) => {
    await User.find({}).exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => { next(error) })
}

const getUser = async (req, res, next) => {

    await User.findById({ _id: req.body._id }).exec()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => { next(error) })
}

const createUser = async (req, res, next) => {
    const { email, username, password } = req.body;
    const { error } = valid.registerValidate({ email, username, password });
    if (error) {
        throw createHttpError(error.details[0].message);
    };
    const isExits = await User.findOne({
        email
    });
    if (isExits) {
        throw createHttpError.Conflict(`User ${username} is exits!`);
    }
    const { _id, ...data } = req.body;
    const userModel = new User(data);
    await userModel.save()
        .then(userSave => {
            res.status(201).json({ message: `User ${userSave.username} have been updated` });
        }).catch(error => {
            res.status(400).json({ error: error });
        });
}

const updateUser = async (req, res, next) => {
    const { email, username, password, _id } = req.body;
    const { error } = valid.registerValidate({ email, username, password });
    if (error) {
        throw createHttpError(error.details[0].message);
    }
    await User.findByIdAndUpdate(_id, req.body).exec()
        .then(user => {
            res.status(201).json({ message: `User ${user.username} have been updated` });
        })
        .catch(error => {
            next(error);
        })
}

const deleteUser = async (req, res, next) => {

    await User.findByIdAndDelete(req.body.id).exec()
        .then(user => {
            res.status(200).json({ message: `User ${user.username} have been deleted` });
        })
        .catch(error => {
            next(error);
        })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};