const Joi = require('@hapi/joi')

const loginValidation = (data) => {
  console.log('hi form joi')
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  }
  Joi.validate(data, schema)
}

module.exports.loginValidation = loginValidation
