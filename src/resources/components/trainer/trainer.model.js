const mongoose = require('mongoose')

const trainerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  gender: String,
  location: { type: String, required: true },
  avatar: String,
  presentation: String,
  specialities: [String],
  reviews: [],
  conversations: [],
  contacts: []
})

const Trainer = mongoose.model('Trainer', trainerSchema)
module.exports = Trainer
