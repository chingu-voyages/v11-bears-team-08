const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../resources/components/user/user.model')

const privateKey = 'test'

function createJwtToken(user) {
  return jwt.sign(user, privateKey, { expiresIn: '100d' })
}

function checkPassword(password, hash) {
  bcrypt.compare(password, hash)
}

async function setPassword(password) {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  return hash
}

async function signup(req, res) {
  // create an instance of the user model.
  const newUser = new User(req.body)
  // hash password using setPassword function before saving to db.
  newUser.password = await setPassword(newUser.password)
  // save to db
  newUser.save(function(err, user) {
    if (err) return res.status(400).json({ error: err })
    // create a JWT token.
    // Also, mongo returns the user as a special format that must be converted to JSON.
    const jwtToken = createJwtToken(JSON.parse(JSON.stringify(user)))

    return res.status(200).json({ data: jwtToken })
  })
}

module.exports = {
  createJwtToken: createJwtToken,
  signup: signup,
  checkPassword: checkPassword
}
