const jwt = require('jsonwebtoken')
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
      return res.json({ error: { message: 'No User Found' } })
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
  const { email, password } = req.body
  const type = req.body.type || 'client'

  if (!email || !password) {
    return res.status(400).send()
  }

  if (type !== 'trainer' && type !== 'client') {
    return res.json({ error: { message: 'Invalid account type.' } })
  }

  try {
    const userSaved = await User.create({ email, password, type })

    // send a signed cookie with the token
    const token = newToken(userSaved._id)
    return res.cookie('authToken', token, genCookieOpts()).json({ token })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({
        error: { field: 'email', message: 'This email already exists.' }
      })
    }

    const { errors } = error
    if (errors) {
      if (errors.email) {
        return res.status(400).json({
          error: { field: 'email', message: errors.email.message }
        })
      }
      if (errors.password) {
        return res.status(400).json({
          error: { field: 'password', message: errors.password.message }
        })
      }
    }

    // other errors would be server generated errors
    return res.status(500).send()
  }
}

async function signin(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send()
  }

  const userExists = await User.findOne({ email })

  if (!userExists || !(await userExists.isValidPassword(password))) {
    return res.status(400).json({ error: { message: 'Invalid credentials' } })
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
