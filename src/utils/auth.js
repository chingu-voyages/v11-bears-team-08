const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../resources/components/user/user.model')

// wrong!!!!!! should be assigned to an env var.
const privateKey = 'gimly-privaaaaaaate'

function newToken(id) {
  const idToJSON = JSON.parse(JSON.stringify(id))
  return jwt.sign({ idToJSON }, privateKey, { expiresIn: '2h' })
}

async function signup(req, res) {
  if (
    !req.body.type ||
    (req.body.type !== 'trainer' && req.body.type !== 'client')
  ) {
    return res.json({ message: 'Invalid account type.' })
  }

  const user = { email: req.body.email, password: req.body.password }

  try {
    const userSaved = await User.create({
      ...user,
      type: req.body.type || 'client'
    })

    const token = newToken(userSaved._id)

    return res.json({ token })
  } catch (error) {
    if ((error.name = 'MongoError' && error.code === 11000)) {
      return res.status(400).json({ message: 'This email already exists.' })
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
  const password = req.body.password || ''

  const userExists = await User.findOne({ email: req.body.email })
    .select('password')
    .exec()

  if (!userExists) {
    return res.status(400).json({ message: 'Email not valid.' })
  }

  const validPassword = await bcrypt.compare(password, userExists.password)

  if (!validPassword) {
    return res.status(400).json({ message: 'Password not valid.' })
  }

  const token = newToken(userExists._id)
  return res.json({ token })
}

module.exports = {
  signup: signup,
  signin: signin
}
