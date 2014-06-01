express-rest-generate
=====================

This module auto generate express routing by your controller's files.


Quick start:
------
```
npm install --save express-rest-generate
```

in express app file:
```javascript
var express = require('express'),
    app = express();

var rest = require('express-rest-generate');

var config = {
  // directory with controller's files
  path = './controllers',

  // example controller name: UserCtrl.js
  ctrlLastName: "Ctrl",

  // true, if we need include controller's directory in routing
  // example: ./controllers/api/PostCtrl.js
  // convert to '/api/post'
  requiredPath: true,

  // override REST API
  actions: {
    // this action will convert to:
    // router.get('/controllerName/:id', controllerObject.show)
    show: {
      method: 'get',
      appendUrl: '/:id'
    }
  }
}

var router = rest(__dirname, config);
// or        rest(__dirname);    for use default config (express-rest-generate/defaultConfig.json)

app.use('/generated-routes', router);

app.listen(3000, function() {
  console.log('server started')
});

```

in our controller file:
```javascript
module.exports = {
  show: function(req, res) {
    res.send('It is SHOW method in our controller. Id: ' + req.params.id);
  }
};
```
