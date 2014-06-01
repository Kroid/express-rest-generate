module.exports = {
  show: function(req, res) { res.send('api:CatCtrl => show ' + req.params.id) },
  list: function(req, res) { res.send('api:CatCtrl => list') },
  create: function(req, res) { res.send('api:CatCtrl => create') },
  update: function(req, res) { res.send('api:CatCtrl => update') },
  delete: function(req, res) { res.send('api:CatCtrl => delete') }
}
