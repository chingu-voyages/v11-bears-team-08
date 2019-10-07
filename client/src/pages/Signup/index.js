import React, { useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  height: 100vh;
  background-color: #edf2f7;
  padding-top: 200px;
  background-image: linear-gradient(
      to right bottom,
      #2196f3,
      rgba(244, 67, 54, 0.9)
    ),
    url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: top;
`

const Form = styled.form`
  display: block;
  margin: 0 auto;
  padding: 2rem;
  width: 320px;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.5rem;
  margin: 0.5rem 0 1rem 0;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  color: #4a5568;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  z-index: 9999;

  &::placeholder {
    color: #ccd2db;
  }
`

const Button = styled.button`
  display: block;
  padding: 0.8rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #f44336;
  color: #fff;
  cursor: pointer;
`

const Label = styled.label`
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: bold;
`

const Error = styled.p`
  color: #f56565;
  font-size: 0.875rem;
  font-style: italic;
`

export default function() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleOnSubmit(e) {
    e.preventDefault()

    // reset fields.
    setPassword('')
    setEmail('')
  }

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
        <Label>Email</Label>
        <Input
          value={email}
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Password</Label>
        <Input
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <Error>{error}</Error> : ''}
        <Button type="submit">Sign Up</Button>
      </Form>
    </Container>
  )
}
