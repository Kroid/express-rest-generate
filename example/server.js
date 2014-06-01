var express = require('express'),
    app = express(),
    port = 3000

var restConfig = require('./restConfig.json');
//var router = require('express-rest-generate')();
var router = require(__dirname + '/../index')(__dirname, restConfig);

app.use('/', router);


app.listen(port, function() {
  console.log('server started on port ', port);
})
