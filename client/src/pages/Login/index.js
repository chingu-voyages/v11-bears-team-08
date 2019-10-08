import React, { useState } from 'react'
import styled from '@emotion/styled'
import { theme } from '../../utils/theme'

import Input from '../../components/lib/Input'
import Submit from '../../components/lib/Submit'

// svg icons
// import email from ''
// import password from '../../assets/icons/password.svg'
// import notes from '../../assets/icons/notes.svg

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`
const Art = styled.div`
  width: 50%;
  svg {
    width: 100%;
    padding: 3em;
  }
`

const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  background: ${theme.colors.lightblue};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Form = styled.form`
  width: 325px;
  height: 40%;
  border-radius: 2px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  padding: 1.5em 2em;
  box-shadow: 10px 10px 0px rgba(255, 255, 255, 0.25);
  background: white;
`

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <Container>
      <Art></Art>
      <FormContainer>
        <Form>
          <Input
            placeholder="Email"
            icon={<img src={require('../../assets/icons/email.svg')} alt="" />}
            setValue={setEmail}
          />
          <Input
            placeholder="Password"
            icon={
              <img src={require('../../assets/icons/password.svg')} alt="" />
            }
            setValue={setPassword}
          />
          <Input
            placeholder="First Name"
            icon={<img src={require('../../assets/icons/notes.svg')} alt="" />}
            setValue={setFirstName}
          />
          <Input
            placeholder="Last Name"
            icon={<img src={require('../../assets/icons/notes.svg')} alt="" />}
            setValue={setLastName}
          />
          <Submit />
        </Form>
      </FormContainer>
    </Container>
  )
}
