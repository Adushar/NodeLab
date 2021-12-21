let database = require('../db');
let connection = database.connection;

exports.findById = function(id, cb) {
  let sql = `SELECT * FROM users WHERE id = ?`;
  connection.get(sql, [id], (err, row) => {
    if (err) { throw err; }
    cb(row);
  })
};

exports.findByUsernameAndPassword = function (username, password, cb) {
  let sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  connection.get(sql, [username, password], (err, row) => {
    if (err) { throw err; }
    cb(row);
  })
};
