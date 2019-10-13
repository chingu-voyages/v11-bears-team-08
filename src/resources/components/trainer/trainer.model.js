const mongoose = require('mongoose')
const User = require('../user/user.model')

const Trainer = User.discriminator(
  'trainer',
  new mongoose.Schema({
    status: {
      type: String,
      enum: ['active', 'draft'],
      default: 'draft'
    },
    description: {
      type: String,
      maxlength: 500
    },
    specialities: [String],
    apointments: [String],
    reviews: [String]
  })
)

module.exports = Trainer
