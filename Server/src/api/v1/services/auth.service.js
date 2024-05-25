'use strict';
const createHttpError = require('http-errors');
const client = require('../utils/connections_redis');
const User = require('../models/user.model');
const valid = require('../validations/author.validate');
const jwt = require('../middlewares/auth.middleware');

const register = async (req) => {
    const { email } = req.body;
    const { error } = valid.registerValidate(req.body);
    if (error) {
        throw createHttpError(error.details[0].message);
    }
    const isExits = await User.findOne({
        email
    });
    if (isExits) {
        throw createHttpError.Conflict(`${email} is ready been register!`);
    }
    const userModel = new User(req.body);
    const saveUser = await userModel.save();
    return saveUser;
};

const newTokens = async (req) => {
    const data = {}
    const { refreshToken } = req.body;
    if (!refreshToken) throw createHttpError.BadRequest();
    const payload = await jwt.verifyRefreshToken(refreshToken);
    const userId = payload.userId;
    const newAccessToken = await jwt.asignAccessToken(userId);
    const newRefreshToken = await jwt.asignRefreshToken(userId);
    data.newAccessToken = newAccessToken;
    data.newRefreshToken = newRefreshToken;
    return data;
}

const login = async (req) => {
    const data = {};
    const { email, password } = req.body;
    const { error } = valid.loginValidate(req.body);
    if (error) {
        throw createHttpError(error.details[0].message);
    }
    const userData = await User.findOne({
        email
    });
    if (!userData) {
        throw createHttpError.NotFound(`${email} is not registed!`);
    }
    const isValid = await userData.isCheckPassword(password);
    if (!isValid) {
        throw createHttpError.Unauthorized();
    }
    const accessToken = await jwt.asignAccessToken(userData._id);
    const refreshToken = await jwt.asignRefreshToken(userData._id);
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;
    return data;
}

const logout = async (req) => {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createHttpError.BadRequest();

    const payload = await jwt.verifyRefreshToken(refreshToken);
    const userId = payload.userId;
    client.del(userId.toString(), (error, reply) => {
        if (error) throw createHttpError.InternalServerError();
    });
}
module.exports = {
    register,
    newTokens,
    login,
    logout
};
