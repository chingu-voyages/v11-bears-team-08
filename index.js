const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// load dev env variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.development.local' })
}

const app = express()

app.use(
  express.json(),
  cookieParser('secret'),
  express.urlencoded({ extended: true })
)
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
}

const authController = require('./src/utils/auth')
app.post('/signup', authController.signup)
app.post('/signin', authController.signin)
app.post('/getCachedToken', authController.getCachedToken)

// deployment specific code that serves CRA's production build
if (process.env.NODE_ENV == 'production') {
  const path = require('path')
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.info(`Successfully connected to port ${PORT}`)
})

// database connection
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/v11-bears-08'
mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.info(`Connected to db via ${DB_URI}`)
  }
)
