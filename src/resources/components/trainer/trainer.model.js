const mongoose = require('mongoose')
const User = require('../user/user.model')

const trainerSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['active', 'draft'],
    default: 'draft'
  },
  description: {
    type: String,
    maxlength: 500,
    trim: true
  },
  experience: {
    type: String,
    trim: true,
    maxlength: 500
  },
  speciality: {
    type: String,
    required: true,
    trim: true,
    minlength: 4
  },
  city: {
    id: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true }
  }
})

module.exports = User.discriminator('Trainer', trainerSchema, 'trainer')
