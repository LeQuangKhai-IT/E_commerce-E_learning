"use strict"
const express = require('express');
const route = express.Router();
const jwt = require('../middlewares/auth.middleware');
const authorController = require('../controllers/author.controller');


route.get('/all', jwt.verifyAccessToken, jwt.authorize('admin'), authorController.getAuthors);

route.get('/:id', jwt.verifyAccessToken, jwt.authorize('admin'), authorController.getAuthor);

route.post('/', jwt.verifyAccessToken, jwt.authorize('admin'), authorController.createAuthor);

route.patch('/:id', jwt.verifyAccessToken, jwt.authorize('admin'), authorController.updateAuthor);

route.delete('/:id', jwt.verifyAccessToken, jwt.authorize('admin'), authorController.deleteAuthor);

