let database = require('../db');
let connection = database.connection;
let crypto = require('crypto');

let findByToken = function (token, cb) {
  let sql = `SELECT * FROM userTokens WHERE refreshToken = ?`;
  connection.get(sql, [token], (err, row) => {
    if (err) { throw err; }
    cb(row);
  })
};

let create = function (userId, cb) {
  let sql = `INSERT INTO userTokens (userId, refreshToken, expiresIn) VALUES(?, ?, ?);`;
  let refreshToken = crypto.randomBytes(20).toString('hex');
  let expireIn = 5_184_000_000;
  connection.get(sql, [userId, refreshToken, expireIn], (err, row) => {
    if (err) { throw err; }
    findByToken(refreshToken, cb)
  })
};

exports.findByToken = findByToken;
exports.create = create;
