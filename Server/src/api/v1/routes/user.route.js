"use strict";

const express = require('express');
const route = express.Router();
const jwt = require('../middlewares/jwt_service');
const userController = require('../controllers/userController');

route.get('/getUsers', jwt.verifyAccessToken, jwt.authorize('admin'), userController.getUsers);
route.get('/getUser:', jwt.verifyAccessToken, userController.getUser);
route.post('/createUser', jwt.verifyAccessToken, jwt.authorize('admin'), userController.createUser);
route.put('/updateUser', jwt.verifyAccessToken, userController.updateUser);
route.delete('/deleteUser', jwt.verifyAccessToken, jwt.authorize('admin'), userController.deleteUser);

module.exports = route;