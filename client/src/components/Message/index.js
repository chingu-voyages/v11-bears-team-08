import React from 'react'
import styled from '@emotion/styled'

const Form = styled.form`
  width: 400px;
  height: 400px;
  border: 1px grey solid;
  background-color: whitesmoke;
`
const MessageBlock = styled.div`
  position: relative;
  height: 90%;
  width: 100%;
`
const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  width: 100%;
  flex-grow: 4;
`
const Button = styled.input`
  flex-grow: 1;
`
export default () => (
  <Form role="form">
    <MessageBlock />
    <InputContainer>
      <Input
        role="input"
        placeholder="Enter Message"
        type="text"
        name="text"
      ></Input>
      <Button role="input" type="submit" />
    </InputContainer>
  </Form>
)
