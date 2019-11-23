import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { authApi } from '../../services/api'
import { UserContext } from '../../App'

import registerImg from '../../assets/img/register.jpg'

const Container = styled.main`
  display: grid;
  grid-template-columns: 2fr 4fr;
`

const Picture = styled.div`
  height: 100vh;
  background-image: url(${registerImg});
  background-size: cover;
  background-position: center;
`

const Form = styled.form`
  display: grid;
  place-self: center;
  width: 400px;
  text-align: center;
`

const Input = styled.input`
  margin: 1em 10%;
  padding: 1em 1.2em;
  border: 1px lightgray solid;
  border-radius: 10px;
  background: #f5f6f7;
  font-size: 0.9rem;
  outline: none;
  transition: 0.2s ease-in-out;
  ${({ error }) => error && 'border-left: 10px red solid;'}
`

const InputError = styled.p`
  margin: 0 calc(10% + 10px);
  margin-top: -1em;
  color: red;
  font-size: 0.8rem;
  text-align: left;
  letter-spacing: 1px;
`

const Button = styled.button`
  margin: 1em 10%;
  padding: 1em 1.2em;
  border-radius: 25px;
  background: ${(props) => (props.trainer ? '#3BAE31' : '#4933EF')};
  color: white;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export default function Signup() {
  const [, setUser] = useContext(UserContext)

  // user state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fNameError, setFNameError] = useState('')
  const [lNameError, setLNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // enables submitting the form only when eligible
  const [isLoading, setLoading] = useState(false)
  const isUserReady = Boolean(firstName && lastName && email && password)
  const isUserInputValid = !Boolean(
    fNameError || lNameError || emailError || passwordError
  )

  async function handleSubmit(e) {
    e.preventDefault()

    if (isLoading || !isUserReady || !isUserInputValid) {
      return
    }

    setLoading(true)
    const { error, user } = await authApi.signup({ email, password })

    if (error) {
      setLoading(false)
      if (error.field === 'firstName') return setFNameError(error.message)
      if (error.field === 'lastName') return setLNameError(error.message)
      if (error.field === 'email') return setEmailError(error.message)
      if (error.field === 'password') return setPasswordError(error.message)
    }

    setLoading(false)
    setUser(user)
  }

  // categorize props for more readability
  const buttonsProps = { isLoading, isUserReady, isUserInputValid }
  const userProps = { firstName, lastName, email, password }
  const setUserProps = { setFirstName, setLastName, setEmail, setPassword }
  const userErrorsProps = { fNameError, lNameError, emailError, passwordError }
  const setUserErrorsProps = {
    setFNameError,
    setLNameError,
    setEmailError,
    setPasswordError
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <UserFields
          userProps={userProps}
          setUserProps={setUserProps}
          errorsProps={userErrorsProps}
          setErrorsProps={setUserErrorsProps}
          buttonsProps={buttonsProps}
        />
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Form>

      <Picture />
    </Container>
  )
}

function UserFields({
  userProps,
  setUserProps,
  errorsProps,
  setErrorsProps,
  buttonsProps
}) {
  return (
    <>
      <h2>Register Today!</h2>
      <Input
        type="text"
        placeholder="First Name"
        value={userProps.firstName}
        onChange={(e) => setUserProps.setFirstName(e.target.value)}
        error={errorsProps.fNameError}
        onFocus={() => setErrorsProps.setFNameError('')}
        onBlur={validateFName}
      />
      {errorsProps.fNameError && (
        <InputError>{errorsProps.fNameError}</InputError>
      )}

      <Input
        type="text"
        placeholder="Last Name"
        value={userProps.lastName}
        onChange={(e) => setUserProps.setLastName(e.target.value)}
        error={errorsProps.lNameError}
        onFocus={() => setErrorsProps.setLNameError('')}
        onBlur={validateLName}
      />
      {errorsProps.lNameError && (
        <InputError>{errorsProps.lNameError}</InputError>
      )}

      <Input
        type="email"
        placeholder="Email"
        value={userProps.email}
        onChange={(e) => setUserProps.setEmail(e.target.value)}
        error={errorsProps.emailError}
        onFocus={() => setErrorsProps.setEmailError('')}
        onBlur={validateEmail}
      />
      {errorsProps.emailError && (
        <InputError>{errorsProps.emailError}</InputError>
      )}

      <Input
        type="password"
        placeholder="password"
        value={userProps.password}
        onChange={(e) => setUserProps.setPassword(e.target.value)}
        error={errorsProps.passwordError}
        onFocus={() => setErrorsProps.setPasswordError('')}
        onBlur={validatePassword}
      />
      {errorsProps.passwordError && (
        <InputError>{errorsProps.passwordError}</InputError>
      )}

      <Button
        disabled={
          buttonsProps.isLoading ||
          !buttonsProps.isUserReady ||
          !buttonsProps.isUserInputValid
        }
      >
        Register as a User
      </Button>
    </>
  )

  function validateFName(e) {
    if (/[^a-zA-Z]/gi.test(e.target.value)) {
      setErrorsProps.setFNameError('Invalid first name format')
    }
  }

  function validateLName(e) {
    if (/[^a-zA-Z]/gi.test(e.target.value)) {
      setErrorsProps.setLNameError('Invalid last name format')
    }
  }

  function validateEmail(e) {
    if (!e.target.value.includes('@')) {
      setErrorsProps.setEmailError('Invalid email format')
    }
  }

  function validatePassword(e) {
    if (e.target.value.length < 8) {
      setErrorsProps.setPasswordError('Password must be more than 8 characters')
    }
  }
}
