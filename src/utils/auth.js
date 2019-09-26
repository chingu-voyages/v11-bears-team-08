const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../resources/components/user/user.model')
const Trainer = require('../resources/components/trainer/trainer.model')

// wrong!!!!!! should be assigned to an env var.
const privateKey = 'gimly-privaaaaaaate'

function newToken(id) {
  const idToJSON = JSON.parse(JSON.stringify(id))
  return jwt.sign({ idToJSON }, privateKey, { expiresIn: '2h' })
}

async function signup(req, res) {
  try {
    //  save user
    const userSaved = await User.create(req.body)
    //  create JWT Token
    const token = newToken(userSaved._id)

    // check to see if user is also signing up as trainer
    const singupForTraineraccount = req.body.trainer

    if (singupForTraineraccount) {
      // user wants to sign up as trainer also
      // const trainerSave = await Trainer.create(req.body.trainer)
      const trainer = new Trainer({
        name: req.body.gender,
        location: req.body.location,
        specialities: req.body.specialities
      })

      trainer.save((saveErr, savedTrainer) => {
        return res.status(201).send({ data: savedTrainer })
      })
    }

    // NOTE: for testing, send back token, usermodel and trainermodel
    return res.status(200).json([{ token }, { userSaved }])
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
