'use strict';
const createHttpError = require('http-errors');
const client = require('../utils/connections_redis');
const User = require('../models/user.model');
const valid = require('../validations/authValidatetion');
const jwt = require('../middlewares/jwt_service');

const register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const { error } = valid.registerValidate({ email, password, username });
        if (error) {
            throw createHttpError(error.details[0].message);
        }
        const isExits = await User.findOne({
            email
        })
        if (isExits) {
            throw createHttpError.Conflict(`${email} is ready been register!`);
        }

        const userModel = new User(req.body);
        const saveUser = await userModel.save();

        return res.status(201).json(saveUser);
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createHttpError.BadRequest();
        const payload = await jwt.verifyRefreshToken(refreshToken);
        const userId = payload.userId;
        const newAccessToken = await jwt.asignAccessToken(userId);
        const newFefreshToken = await jwt.asignRefreshToken(userId);
        res.json({ newAccessToken, newFefreshToken });

    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = valid.loginValidate(req.body);
        if (error) {
            throw createHttpError(error.details[0].message);
        }
        const userData = await User.findOne({
            email
        })
        if (!userData) {
            throw createHttpError.NotFound(`${email} is not registed!`);
        }
        const isValid = await userData.isCheckPassword(password);
        if (!isValid) {
            throw createHttpError.Unauthorized();
        }
        const accessToken = await jwt.asignAccessToken(userData._id);
        const refreshToken = await jwt.asignRefreshToken(userData._id);
        res.send({
            accessToken,
            refreshToken
        });
    } catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw createHttpError.BadRequest();

        const payload = await jwt.verifyRefreshToken(refreshToken);
        const userId = payload.userId;
        client.del(userId.toString(), (error, reply) => {
            if (error) throw createHttpError.InternalServerError();
            res.json({
                message: 'Logout!'
            })
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    refreshToken,
    login,
    logout
}