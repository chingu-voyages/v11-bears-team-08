const mongoose = require('mongoose')
const User = require('../user/user.model')

const Client = User.discriminator(
  'Client',
  new mongoose.Schema({
    favourites: [String]
  })
)

module.exports = Client
