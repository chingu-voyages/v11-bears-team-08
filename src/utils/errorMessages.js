module.exports = {
  signup: {
    email: {
      required: 'Email is required.',
      invalidFormat: 'This email is not in an email format.',
      alreadyExists: 'This email already exists.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password requires to have 8 characters minimum.'
    }
  },
  signin: {
    email: {
      required: 'Email is required.',
      notFound: 'No account found.'
    },
    password: {
      required: 'Password is required.',
      wrongPassword: 'Wrong password.'
    }
  }
}
