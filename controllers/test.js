const TokenService = require('../services/token_service');

exports.info = function (req, res) {
  TokenService.currentUser(req.headers.authorization, function (user) {
    if (!user) { return res.status(400).send('Authentication failed'); }
    res.send(`Hello ${user.username}`);
  });
};
