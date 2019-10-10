import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { authApi } from '../../services/api'
import { UserContext } from '../../App'

import touchImage from '../../assets/img/touch.jpg'

const Container = styled.main`
  display: grid;
  grid-template-columns: 2fr 4fr;
`

const Picture = styled.div`
  height: 100vh;
  background-image: url(${touchImage});
  background-size: cover;
  background-position: center;
`

const Form = styled.form`
  display: grid;
  place-self: center;
  width: 400px;
  text-align: center;
`

const LoginError = styled.p`
  padding: 5px 2em;
  background: hsla(0, 100%, 50%, 0.2);
  color: red;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 1px;
`

const Input = styled.input`
  margin: 1em 10%;
  padding: 1em 1.2em;
  border: 1px lightgray solid;
  border-radius: 10px;
  background: #f5f6f7;
  font-size: 0.9rem;
  outline: none;
`

const LoginButton = styled.button`
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

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [, setUser] = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault()

    const { error, user } = await authApi.signin({ email, password })

    if (error) {
      return setError(error.message)
    }

    setUser(user)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        {error && <LoginError>{error}</LoginError>}

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Your password"
        />

        <LoginButton>Sign In</LoginButton>

        <p>
          If you don't have an account, <Link to="/register">sign up</Link>
        </p>
      </Form>

      <Picture />
    </Container>
  )
}
