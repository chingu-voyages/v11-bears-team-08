const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../resources/components/user/user.model')
const errorMessages = require('./errorMessages')

// wrong!!!!!! should be assigned to an env var.
const privateKey = 'gimly-privaaaaaaate'

function newToken(id) {
  const idToJSON = JSON.parse(JSON.stringify(id))
  return jwt.sign({ idToJSON }, privateKey, { expiresIn: '2h' })
}

async function signup(req, res) {
  try {
    const userSaved = await User.create(req.body)
    const token = newToken(userSaved._id)
    return res.status(200).json({ token })
  } catch (error) {
    // email duplication returns a sepcial error.
    if ((error.name = 'MongoError' && error.code === 11000)) {
      return res
        .status(400)
        .json({ message: errorMessages.signup.email.alreadyExists })
    }

    if (error.errors && error.errors.email) {
      return res.status(400).json({ message: error.errors.email.message })
    }

    if (error.errors && error.errors.password) {
      return res.status(400).json({ message: error.errors.password.message })
    }

    // in case any errors are not properly handled.
    return res.status(400).json({ message: error })
  }
}

async function signin(req, res) {
  if (!req.body.email) {
    return res
      .status(400)
      .send({ message: errorMessages.signin.email.required })
  }

  if (!req.body.password) {
    return res
      .status(400)
      .send({ message: errorMessages.signin.password.required })
  }

  const userExists = await User.findOne({ email: req.body.email })
    .select('password')
    .exec()

  if (!userExists) {
    return res
      .status(400)
      .send({ message: errorMessages.signin.email.notFound })
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    userExists.password
  )

  if (validPassword) {
    const token = newToken(userExists._id)

    return res.status(200).send({ token })
  }

  // in case any errors are not properly handled.
  return res
    .status(400)
    .send({ message: errorMessages.signin.password.wrongPassword })
}

module.exports = {
  signup: signup,
  signin: signin
}
