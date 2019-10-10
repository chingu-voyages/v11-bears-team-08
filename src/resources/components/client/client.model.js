const mongoose = require('mongoose')
const User = require('../user/user.model')

const Client = User.discriminator(
  'client',
  new mongoose.Schema({
    favs: [String]
  })
)

module.exports = Client
