const Joi = require('@hapi/joi')

const loginValidation = (data) => {
  const loginSchema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  }

  console.log(data, loginSchema)
  return Joi.validate(data, loginSchema)
}

module.exports.loginValidation = loginValidation
