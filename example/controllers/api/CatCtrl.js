module.exports = {
  show: function(req, res) { res.send('api:Cat:show:' + res.params.id) }
}
