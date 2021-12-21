const TokenService = require('../services/token_service');
const User = require('../models/users');
const UserToken = require('../models/user_tokens');

exports.signin = function (req, res) {
  User.findByUsernameAndPassword(req.body.username, req.body.password, function (user) {
    if (!user) { return res.status(400).send('Username or password is invalid'); }

    TokenService.generateRefreshToken(user.id, function (userToken) {
      res.json({
        accessToken: TokenService.generateAccessToken(userToken.userId),
        refreshToken: userToken.refreshToken
      });
    });
  });
};

exports.refresh = function (req, res) {
  UserToken.findByToken(req.body.refreshToken, function (userToken) {
    if (!userToken) { return res.status(400).send('Refresh token is invalid'); }
    if (TokenService.isRefreshTokenExpired(userToken)) { return res.status(400).send('Refresh token is expired'); }

    TokenService.generateRefreshToken(userToken.userId, function (userToken) {
      res.json({
        accessToken: TokenService.generateAccessToken(userToken.userId),
        refreshToken: userToken.refreshToken
      });
    });
  });
};
