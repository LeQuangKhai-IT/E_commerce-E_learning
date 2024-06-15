"use strict";

const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth.controller");

route.post("/register", authController.register);

route.post("/refresh-token", authController.refreshToken);

route.post("/login", authController.login);

route.delete("/logout", authController.logout);

route.post("/password-reset", authController.passwordToken);

route.post("/password-reset/:userId/:token", authController.resetPassword);
module.exports = route;
