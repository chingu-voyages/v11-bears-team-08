import React, { useState } from 'react'
import styled from '@emotion/styled'
import registerImg from '../../assets/img/register.jpg'

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 2fr 4fr;
`
const Picture = styled.div`
  height: 100vh;
  background-image: url(${registerImg});
  background-size: cover;
  background-position: center;
`

const PictureContainer = styled.section`
  height: 100vh;
  width: 100%;
`

const Form = styled.form`
  text-align: center;
  display: grid;

  width: 400px;
  height: 400px;

  place-self: center;
`

const FormTitle = styled.h2`
  font-weight: bold;
`

const Input = styled.input`
  outline: none;
  background: #f5f6f7;
  border-width: 1px 1px 1px ${(props) => (props.error ? '10px' : '1px')};
  border-style: solid;
  border-color: lightgrey;

  ${(props) => (props.error ? 'border-left-color: red;' : null)}
  transition: .2s ease-in-out;
  margin-bottom: 0.1em;
  padding: 1rem 1.2rem;
  width: 80%;
  border-radius: 10px;
  font-size: 0.9rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const HelperText = styled.p`
  letter-spacing: 1px;
  padding: 0;
  margin: 0 0 0 1em;
  font-size: 0.8rem;
  color: ${(props) => (props.error ? 'red' : 'black')};
`
const HelperTextWrapper = styled.div`
  margin: 0 0 0.9em 0;
  padding: 0;

  width: 80%;
  text-align: start;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginButton = styled.button`
  width: 80%;
  border-radius: 25px;
  padding: 1rem 1.2rem;
  background: #4933ef;
  outline: none;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
`

const NoAccountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const NoAccount = styled.p``

const SignUpLink = styled.button`
  background: none;
  display: inline-block;
  text-decoration: underline;
  margin: 0;
  padding: 0;
  cursor: pointer;
`
export default () => {
  const [email, setEmail] = useState('email...')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('Name')
  const [nameErr, setNameErr] = useState(false)
  const [pwdErr, setPwdErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)

  const validateNameTxt = (text) => (/[^a-zA-Z]/gi.test(text) ? 'error' : '')

  const updateNameText = (value) =>
    value === 'error' ? setNameErr(true) : setNameErr(false)

  const validateEmailText = (text) => {
    if (text.includes('@')) return
    return 'error'
  }

  const updateEmailText = (value) => {
    return value === 'error' ? setEmailErr(true) : setEmailErr(false)
  }

  const validatePwdText = (text) => {
    if (text.length > 6) return
    return 'error'
  }

  const updatePwdText = (value) => {
    return value === 'error' ? setPwdErr(true) : setPwdErr(false)
  }

  const handleChange = (e) => {
    const targetEventName = e.target.name
    const targetEventValue = e.target.value

    if (targetEventName === 'email') {
      setEmail(targetEventValue)
      updateEmailText(validateEmailText(targetEventValue))
    } else if (targetEventName === 'password') {
      setPassword(targetEventValue)
      updatePwdText(validatePwdText(targetEventValue))
    } else {
      setName(targetEventValue)
      updateNameText(validateNameTxt(targetEventValue))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    setEmail('')
    setPassword('')
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Register Today!</FormTitle>
        <InputContainer>
          <Input
            value={name}
            type="text"
            name="name"
            onChange={handleChange}
            error={nameErr}
          />
          <HelperTextWrapper>
            {nameErr ? (
              <HelperText error>Only Alphabetic Characters</HelperText>
            ) : (
              <HelperText>Helper Text</HelperText>
            )}
          </HelperTextWrapper>
          <Input
            value={email}
            type="email"
            name="email"
            onChange={handleChange}
            error={emailErr}
          />
          <HelperTextWrapper>
            {emailErr ? (
              <HelperText error>Invalid email type</HelperText>
            ) : (
              <HelperText>Helper Text</HelperText>
            )}
          </HelperTextWrapper>
          <Input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            error={pwdErr}
          />
          <HelperTextWrapper>
            {pwdErr ? (
              <HelperText error>
                Password must be more than 6 characters
              </HelperText>
            ) : (
              <HelperText>Helper Text</HelperText>
            )}
          </HelperTextWrapper>
        </InputContainer>

        <ButtonContainer>
          <LoginButton type="submit">Register</LoginButton>
        </ButtonContainer>
        <NoAccountWrapper>
          <NoAccount>
            Already have an account? <SignUpLink>Sign In</SignUpLink>
          </NoAccount>
        </NoAccountWrapper>
      </Form>
      <PictureContainer>
        <Picture />
      </PictureContainer>
    </Container>
  )
}
