const jwt = require('jwt-simple');
const User = require('../models/users');
const UserToken = require('../models/user_tokens');
const config = require('../config');

function generateAccessToken(userId) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: userId, iat: timestamp, expireIn: 1800 * 1000 }, config.secret);
}

function currentUser(token, cb) {
  if (!token) { cb(null); return; }
  let tokenDetails = jwt.decode(token, config.secret);
  let expireAt = new Date(tokenDetails.iat + tokenDetails.expireIn);
  if (expireAt <= Date.now()) { cb(null); return; }

  User.findById(tokenDetails.userId, function (user) {
    cb(user);
  });
}

function generateRefreshToken(userId, cb) {
  UserToken.create(userId, cb)
}

function isRefreshTokenExpired(userToken) {
  var expireAt = new Date(userToken.createdAt);
  expireAt.setMilliseconds(expireAt.getMilliseconds() + userToken.expiresIn);

  return (expireAt <= Date.now())
}

exports.generateAccessToken = generateAccessToken;
exports.currentUser = currentUser;
exports.generateRefreshToken = generateRefreshToken;
exports.isRefreshTokenExpired = isRefreshTokenExpired;
