"use strict";

const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
require('dotenv').config();

const clientRedis = require('../utils/connections_redis');
const User = require('../models/user.model');

const asignAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const option = {
            expiresIn: '1h',
        }
        JWT.sign(payload, secret, option, (error, token) => {
            if (error)
                reject();
            resolve(token);
        });
    })
}

const asignRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        };
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const option = {
            expiresIn: '1d',
        }
        JWT.sign(payload, secret, option, (error, token) => {
            if (error)
                reject();
            clientRedis.set(userId.toString(), token, 'EX', 60 * 60, (error, reply) => {
                if (error) return reject(createHttpError.InternalServerError());

            })
            resolve(token);
        });
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createHttpError.Unauthorized());
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) {
            if (error.name === 'JsonWebTokenError') {
                return next(createHttpError.Unauthorized());
            }
            return next(createHttpError.Unauthorized(error.message));
        }
        req.payload = payload;
        next();
    });
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, payload) => {
            if (error) return reject(error);
            clientRedis.get(payload.userId, (error, reply) => {
                if (error) return reject(createHttpError.InternalServerError());
                if (refreshToken === reply) {
                    return resolve(payload);
                }
                return reject(createHttpError.Unauthorized());
            })
        })
    });
}

const authorize = (permissions) => {
    return async (req, res, next) => {
        const { _id } = req.body;
        if (!_id) {
            return res.status(403).json('You need sign in!');
        }
        const user = await User.findById(_id);
        if (!user) {
            return res.status(403).json('User not found!')
        }
        const { role } = user;
        if (!permissions.includes(role)) {
            return res.status(401).json('You dont have permission!');
        }
        next();
    }
}

module.exports = {
    asignAccessToken,
    asignRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    authorize
};
