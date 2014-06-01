express-rest-generate
=====================

This module auto generate express routing by your controller's files.


Example
-------
Structure:
```
controllers
  api
    CatCtrl.js
  DogCtrl.js
server.js
```

in server.js:
```
var app = require('express')();
var router = require('express-rest-generate')(__dirname);

app.use('/', router);
```

our controller , for example controllers/api/CatCtrl.js:
```
module.exports = {
  show: function(req, res) { res.send('api:CatCtrl => show ' + req.params.id) },
  list: function(req, res) { res.send('api:CatCtrl => list') },
  create: function(req, res) { res.send('api:CatCtrl => create') },
  update: function(req, res) { res.send('api:CatCtrl => update') },
  delete: function(req, res) { res.send('api:CatCtrl => delete') }
}
```

start server (node server.js) and send requests:
```
list request:   GET /api/cats
show request:   GET /api/cat/catName
create request: POST /api/cat
```

express-rest-generate automatic parse our controllers with his actions and create express.Router object.
