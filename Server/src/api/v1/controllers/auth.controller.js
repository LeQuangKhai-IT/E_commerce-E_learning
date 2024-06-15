"use strict";
const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const saveUser = await authService.register(req);
    return res.status(201).json(saveUser);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const data = await authService.newTokens(req);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.login(req);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const passwordToken = async (req, res, next) => {
  try {
    const data = await authService.passwordToken(req);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const data = await authService.resetPassword(req);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req);
    res.json({
      message: "Logout!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  refreshToken,
  login,
  resetPassword,
  passwordToken,
  logout,
};
