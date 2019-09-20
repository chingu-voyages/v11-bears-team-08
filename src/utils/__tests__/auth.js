const axios = require('axios')
const User = require('../../resources/components/user/user.model')
const errorMessages = require('../errorMessages')
const faker = require('faker')

const getError = (error) => error.response

let api, email, password

describe('Authentication', () => {
  beforeAll(() => {
    // Beware!! All tests use your local db.
    const baseURL = `http://localhost:3001`
    api = axios.create({ baseURL })
    // default user credentials.
    email = 'test@test.com'
    password = 'testtest'
  })

  beforeEach(async () => {
    // reset users collection before each test.
    // TODO: why delete still works without 'await' ???
    await User.deleteMany({ email })
  })

  describe('signup:', () => {
    test('requires email', async () => {
      const error = await api.post('/signup').catch(getError)

      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signup.email.required }
      })
    })

    test('email must be unique', async () => {
      await api.post('/signup', { email, password }).catch(getError)
      const error = await api
        .post('/signup', { email, password })
        .catch(getError)
      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signup.email.alreadyExists }
      })
    })

    test('email should be in the right format', async () => {
      const error = await api
        .post('/signup', { email: 'testtest.com', password })
        .catch(getError)

      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signup.email.invalidFormat }
      })
    })

    test('requires password', async () => {
      const error = await api.post('/signup', { email }).catch(getError)

      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signup.password.required }
      })
    })

    test('password requires 8 characters min.', async () => {
      const error = await api
        .post('/signup', { email, password: 'test' })
        .catch(getError)

      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signup.password.minlength }
      })
    })

    test('returns a valid token', async () => {
      const error = await api
        .post('/signup', {
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        .catch(getError)

      expect(error).toMatchObject({
        status: 200,
        data: { token: expect.any(String) }
      })
    })
  })

  describe('login:', () => {
    test('login requires an email', async () => {
      const error = await api.post('/signin', { password }).catch(getError)

      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signin.email.required }
      })
    })

    test('login requires a password', async () => {
      const error = await api.post('/signin', { email }).catch(getError)

      expect(error).toMatchObject({
        status: 400,
        data: { message: errorMessages.signin.password.required }
      })
    })

    test('returns a valid token', async () => {
      //await User.remove({ email })
      // await api.post('/signup', { email, password }).catch(getError)
      const error = await api
        .post('/signin', { email, password })
        .catch(getError)

      expect(error).toMatchObject({
        status: 200,
        data: { token: expect.any(String) }
      })
    })
  })

  afterAll(async () => {})
})
