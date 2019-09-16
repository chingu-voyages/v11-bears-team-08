const router = require('express').Router()
const User = require('../models/user')
// const { loginValidation } = require('../controllers/validation')

router.post('/login', async (req, res) => {
  // const { error } = loginValidation({
  //   email: req.body.email,
  //   password: req.body.password
  // })
  // if (error) {
  //   return res.status(400).send('not working')
  // }
  // console.log(req.body)

  const userExists = await User.findOne({ email: req.body.email })
  if (!userExists) {
    return res.status(400).send('Incorrect email')
  }

  res.send('user exists!')
})

module.exports = router
