const { searchByLocation } = require('./trainer.controllers.js')

module.exports = function(app) {
  app.get('/api/trainers', searchByLocation)
}
