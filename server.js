var express = require('express');
var bodyParser = require('body-parser');
let authenticationController = require('./controllers/authentication');
let testController = require('./controllers/test');

var app = express();
app.use(bodyParser.json())
app.post('/auth/sign_in', authenticationController.signin);
app.post('/auth/refresh', authenticationController.refresh);
app.get('/test/info', testController.info);

app.listen(3012, function () {
  console.log('App started');
});
