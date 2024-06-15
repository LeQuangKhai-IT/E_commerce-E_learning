"use strict";
const createHttpError = require("http-errors");
const client = require("../utils/connections_redis");
const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const sendEmail = require("../utils/sendEmail");
const valid = require("../validations/auth.validate");
const jwt = require("../middlewares/auth.middleware");

const register = async (req) => {
  const data = {};
  const { email } = req.body;
  const { error } = valid.registerValidate(req.body);
  if (error) {
    throw createHttpError(error.details[0].message);
  }
  const isExits = await User.findOne({
    email,
  });
  if (isExits) {
    throw createHttpError.Conflict(`${email} is ready been register!`);
  }
  const userModel = new User(req.body);
  const saveUser = await userModel.save();
  const { fname, lname } = saveUser;
  data.account = { email, fname, lname };
  data.msg = "Register successfully!";
  return data;
};

const login = async (req) => {
  const data = {};
  const { email, password } = req.body;
  const { error } = valid.loginValidate(req.body);
  if (error) {
    throw createHttpError(error.details[0].message);
  }
  const userData = await User.findOne({
    email,
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
  let { _id, fname, lname, avatar, headline, role, website } = userData;
  data.accessToken = accessToken;
  data.refreshToken = refreshToken;
  data.account = {
    _id,
    email,
    fname,
    lname,
    avatar,
    headline,
    role,
    website,
  };
  data.msg = "You are successfully logged in!";
  return data;
};

const newTokens = async (req) => {
  const data = {};
  const { refreshToken } = req.body;
  if (!refreshToken) throw createHttpError.BadRequest();
  const payload = await jwt.verifyRefreshToken(refreshToken);
  const userId = payload.userId;
  const newAccessToken = await jwt.asignAccessToken(userId);
  const newRefreshToken = await jwt.asignRefreshToken(userId);
  data.newAccessToken = newAccessToken;
  data.newRefreshToken = newRefreshToken;
  return data;
};

const passwordToken = async (req) => {
  const data = {};
  const { email } = req.body;
  const { error } = valid.emailValidate({ email });
  if (error) throw createHttpError(error.details[0].message);
  const userData = await User.findOne({
    email,
  });
  if (!userData) {
    throw createHttpError.NotFound(`user with given email doesn't exist`);
  }
  let token = await Token.findOne({ userId: userData._id });
  if (!token) {
    token = await new Token({
      userId: userData._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }
  const code = `Code: ${userData._id}/${token.token}`;
  await sendEmail(userData.email, "Password reset", code);
  data.msg = "password reset code sent to your email account";
  return data;
};

const resetPassword = async (req) => {
  const data = {};
  const { password } = req.body;
  const { error } = valid.passwordValidate({ password });
  if (error) throw createHttpError(error.details[0].message);

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send("invalid code or expired");

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) throw createHttpError("Invalid code or expired");

  user.password = req.body.password;
  await user.save();
  await token.deleteOne();
  data.msg = "password reset sucessfully.";
  return data;
};

const logout = async (req) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw createHttpError.BadRequest();
  const payload = await jwt.verifyRefreshToken(refreshToken);
  const userId = payload.userId;
  client.del(userId.toString(), (error, reply) => {
    if (error) throw createHttpError.InternalServerError();
  });
};
module.exports = {
  register,
  newTokens,
  login,
  passwordToken,
  resetPassword,
  logout,
};
