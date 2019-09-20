const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const errorMessages = require('../../../utils/errorMessages')

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
    required: [true, errorMessages.signup.email.required],
    unique: true,
    trim: true,
    select: false,
    validate: [validEmail, errorMessages.signup.email.invalidFormat]
  },
  password: {
    type: String,
    minlength: [8, errorMessages.signup.password.minlength],
    required: [true, errorMessages.signup.password.required],
    select: false
  }
})

function validEmail(val) {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val) //  eslint-disable-line no-useless-escape
}

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  // hash password using bcrypt function before saving to db.
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err)
    }

    this.password = hash
    next()
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User
