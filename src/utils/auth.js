const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const omit = require('lodash.omit')
const User = require('../resources/components/user/user.model')

// wrong!!!!!! should be assigned to an env var.
const privateKey = 'gimly-privaaaaaaate'

function newToken(id) {
  const idToJSON = JSON.parse(JSON.stringify(id))
  return jwt.sign({ idToJSON }, privateKey, { expiresIn: '7d' })
}

function genCookieOpts() {
  const afterSevenDays = new Date(Date.now() + 7 * 24 * 60 * 60)

  const cookieOptions = {
    httpOnly: true,
    expires: afterSevenDays,
    signed: true
  }
  return cookieOptions
}

async function getCachedToken(req, res) {
  const { authToken } = req.signedCookies

  if (!authToken) {
    return res.status(204).send()
  }

  try {
    await jwt.verify(authToken, privateKey)

    return res.json({ token: authToken })
  } catch (error) {
    if (error.name === 'JsonWebTokenError')
      return res.status(401).json({ error })

    return res.status(500).send()
  }
}

async function getLoggedUser(req, res) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(204).send()
  }

  const token = authorization.split(' ')[1]

  try {
    const { idToJSON: userId } = await jwt.verify(token, privateKey)
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.json({ message: 'No User Found' })
    }

    return res.json({ user: getSafeUser(user.toObject()) })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error })
    }

    return res.status(500).send()
  }
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

    // send a signed cookie with the token
    const token = newToken(userSaved._id)
    return res.cookie('authToken', token, genCookieOpts()).json({ token })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
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

  if (!userExists) {
    return res.status(400).json({ message: 'Email not valid.' })
  }

  const validPassword = await bcrypt.compare(password, userExists.password)

  if (!validPassword) {
    return res.status(400).json({ message: 'Password not valid.' })
  }

  // send a signed cookie with the token
  const token = newToken(userExists._id)
  return res.cookie('authToken', token, genCookieOpts()).json({ token })
}

module.exports = {
  signup,
  signin,
  getCachedToken,
  getLoggedUser
}

function getSafeUser(user) {
  return omit(user, ['__v', '_id', 'password'])
}
