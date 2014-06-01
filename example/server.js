var express = require('express'),
    app = express(),
    port = 3000

var restConfig = require('./restConfig.json');
var router = require('express-rest-generate')(__dirname, restConfig);
/* or for run with default configuration:
 * var router = require('express-rest-generate')(__dirname); */

app.use('/', router);


app.listen(port, function() {
  console.log('server started on port ', port);
});
