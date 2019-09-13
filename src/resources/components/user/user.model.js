const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    select: false
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false
  }
})

// userSchema.pre('save', function (next) {
//   if (!this.isModified('password')) {
//     console.log('not modified')
//     return next()
//   }

//   next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User
