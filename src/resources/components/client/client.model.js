const mongoose = require('mongoose')
const User = require('../user/user.model')

const clientSchema = new mongoose.Schema({
  favs: [String]
})

module.exports = User.discriminator('Client', clientSchema, 'client')
