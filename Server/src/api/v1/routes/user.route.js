"use strict";

const express = require('express');
const route = express.Router();
const jwt = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

route.get('/all', jwt.verifyAccessToken, jwt.authorize('admin'), userController.getUsers);

route.get('/:id', jwt.verifyAccessToken, userController.getUser);

route.post('/', jwt.verifyAccessToken, jwt.authorize('admin'), userController.createUser);

route.patch('/:id', jwt.verifyAccessToken, userController.updateUser);

route.delete('/:id', jwt.verifyAccessToken, jwt.authorize('admin'), userController.deleteUser);

module.exports = route;