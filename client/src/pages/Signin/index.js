import React, { useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: grid;
  text-align: center;
  place-items: center;
`

const Form = styled.form`
  display: grid;
  /* grid-template-rows: 1fr 2fr 2fr 1fr; */
  /* flex-direction: column; */
  width: 400px;
  height: 400px;
  background: whitesmoke;
`

const FormTitle = styled.h2``

const Input = styled.input`
  outline: none;
  border: 1px lightgray solid;
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
  display: inline-block;
  text-decoration: underline;
  margin: 0;
  padding: 0;
  cursor: pointer;
`
export default () => {
  const [email, setEmail] = useState('your email...')
  const [password, setPassword] = useState('your email...')
  const handleInput = (e) => setEmail(e.target.value)

  return (
    <Container>
      <Form>
        <FormTitle>Welcome Back!</FormTitle>
        <InputContainer>
          <Input value={email} onChange={handleInput} />
          <HelperTextWrapper>
            <HelperText>Helper Text</HelperText>
          </HelperTextWrapper>
          <Input value="your password..." onChange={handleInput} />
          <HelperTextWrapper>
            <HelperText>Helper Text</HelperText>
          </HelperTextWrapper>
        </InputContainer>

        <ButtonContainer>
          <LoginButton type="login">Sign In</LoginButton>
        </ButtonContainer>
        <NoAccountWrapper>
          <NoAccount>
            If you don't have an account <SignUpLink>SignUp</SignUpLink>
          </NoAccount>
        </NoAccountWrapper>
      </Form>
    </Container>
  )
}
