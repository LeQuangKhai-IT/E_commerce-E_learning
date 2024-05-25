'use strict';

const userService = require('../services/user.service');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const userSave = await userService.createUser(req);
        res.status(201).json({ message: `User ${userSave._id} have been created` });
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req);
        res.status(201).json({ message: `User ${req.params.id} have been updated` });
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req);
        res.status(200).json({ message: `User ${req.params.id} have been deleted` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};