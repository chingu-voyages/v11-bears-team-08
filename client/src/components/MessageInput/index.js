import React, { useContext } from 'react'
import styled from '@emotion/styled'

const Form = styled.form`
  position: relative;
  width: calc(100% - 5em);
  margin: 0 auto;
`

const Input = styled.input`
  position: relative;
  width: 100%;
  color: #333;
  padding: 25px 90px 25px 50px;
  border-radius: 5px;
  font-size: 1.5em;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  outline: none;
  &::placeholder {
    color: #c1c1c1;
  }
`

const Button = styled.button`
  position: absolute;
  right: 40px;
  bottom: 24px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #4d37f3;
  fill: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 5px 7px;
  svg {
    width: 15px;
    height: 15px;
  }
`

export default ({ sendMessage, input, handleChangeText }) => {
  return (
    <Form onSubmit={sendMessage}>
      <Input
        placeholder="Type a message..."
        onChange={handleChangeText}
        value={input}
        type="text"
        name="text"
      />
      <Button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
        </svg>
      </Button>
    </Form>
  )
}
