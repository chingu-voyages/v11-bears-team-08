const jwt = require('jsonwebtoken')
const omit = require('lodash.omit')
const User = require('../resources/components/user/user.model')
const Client = require('../resources/components/client/client.model')
const privateKey = process.env.JWT_SECRET || 'gimly-privaaaaaaate'

// configures all auth routes, effectively making this file a module
module.exports = function setupAuthRoutes(router) {
  router.get('/getLoggedUser', getLoggedUser)
  router.get('/getCachedToken', getCachedToken)
  router.post('/signin', signin)
  router.post('/signup', signup)
}

async function getLoggedUser(req, res) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(204).send()
  }

  const token = authorization.split(' ')[1]

  try {
    const { id: userId } = await jwt.verify(token, privateKey)
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

async function signin(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send()
  }

  const user = await User.findOne({ email })

  if (!user || !(await user.isValidPassword(password))) {
    return res.json({ error: { message: 'Invalid credentials' } })
  }

  // send a signed cookie with the token
  const token = signUserToken(user._id)
  return res.cookie('authToken', token, getCookieOpts()).json({ token })
}

async function signup(req, res) {
  const { type, email, password } = req.body

  if (!type || !email || !password) {
    return res.status(400).send()
  }

  if (type !== 'trainer' && type !== 'client') {
    return res.json({ error: { message: 'Invalid account type.' } })
  }

  try {
    const user = new Client({ email, password })
    await user.save()

    // send a signed cookie with the token
    const token = signUserToken(user._id)
    return res.cookie('authToken', token, getCookieOpts()).json({ token })
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.json({
        error: { field: 'email', message: 'This email already exists.' }
      })
    }

    const { errors } = error
    if (errors) {
      const firstErrName = Object.keys(errors)[0]
      return res.json({
        error: { field: firstErrName, message: errors[firstErrName].message }
      })
    }

    // other errors would be server generated errors
    return res.status(500).send()
  }
}

/****** Utilities ******/
function getSafeUser(user) {
  return omit(user, ['__v', '_id', 'password'])
}

function signUserToken(id) {
  return jwt.sign({ id }, privateKey, { expiresIn: '7d' })
}

function getCookieOpts() {
  const afterSevenDays = new Date(Date.now() + 7 * 24 * 60 * 60)

  const cookieOptions = {
    httpOnly: true,
    expires: afterSevenDays,
    signed: true
  }
  return cookieOptions
}
