const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const baseOptions = {
  discriminatorKey: '__type',
  collection: 'users'
}

const userSchema = new mongoose.Schema(
  {
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
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      validate: [validEmail, 'This email is not in an email format.']
    },
    password: {
      type: String,
      minlength: [8, 'Password requires to have 8 characters minimum.'],
      required: [true, 'Password is required.']
    },
    avatar: String,
    apointments: [String],
    conversations: [String]
  },
  baseOptions
)

function validEmail(val) {
  return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val) // eslint-disable-line no-useless-escape
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

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
