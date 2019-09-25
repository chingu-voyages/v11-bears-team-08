const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Trainer = require('../resources/components/trainer/trainer.model')
const Client = require('../resources/components/client/client.model')

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
    res.json({ message: 'Invalid account type.' })
  }

  const user = { email: req.body.email, password: req.body.password }

  try {
    let userSaved

    if ((req.body.type = 'trainer')) {
      userSaved = await Trainer.create(user)
    } else {
      userSaved = await Client.create(user)
    }

    const token = newToken(userSaved._id)

    return res.status(200).json({ token })
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
    return res.status(400).send({ message: 'Email not valid.' })
  }

  const validPassword = await bcrypt.compare(password, userExists.password)

  if (validPassword) {
    const token = newToken(userExists._id)

    return res.status(200).send({ token })
  }

  return res.status(400).send({ message: 'Password not valid.' })
}

module.exports = {
  signup: signup,
  signin: signin
}
