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

const RegisterButton = styled.button`
  margin: 1em 10%;
  padding: 1em 1.2em;
  border-radius: 25px;
  background: #4933ef;
  color: white;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
`

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [, setUser] = useContext(UserContext)

  function validateEmail(e) {
    if (!e.target.value.includes('@')) setEmailError('Invalid email format')
  }

  function validatePassword(e) {
    if (e.target.value.length < 8) {
      setPasswordError('Password must be more than 8 characters')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { error, user } = await authApi.signup({ email, password })

    if (error) {
      if (error.field === 'email') return setEmailError(error.message)
      if (error.field === 'password') return setPasswordError(error.message)
    }

    setUser(user)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Register Today!</h2>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onBlur={validateEmail}
          onFocus={() => setEmailError('')}
          type="email"
          placeholder="Email"
          error={emailError}
        />
        {emailError && <InputError>{emailError}</InputError>}

        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onBlur={validatePassword}
          onFocus={() => setPasswordError('')}
          type="password"
          placeholder="password"
          error={passwordError}
        />
        {passwordError && <InputError>{passwordError}</InputError>}

        <RegisterButton>Register</RegisterButton>

        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Form>

      <Picture />
    </Container>
  )
}
