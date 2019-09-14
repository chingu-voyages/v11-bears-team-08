const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// import auth routers

const authRoutes = require('./src/routes/auth')

// load dev env variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.development.local' })
}

const app = express()

app.use(express.json(), express.urlencoded({ extended: true }))
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
} else {
  app.use(morgan('dev'))
}
app.use('/api/user', authRoutes)

app.get('/api', (req, res) => {
  res.json({ message: 'You received a response from the server' })
})

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
