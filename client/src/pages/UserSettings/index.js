import React, { useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`

const Form = styled.form`
  background-color: white;
  height: 90%;
  width: 60%;
  border-radius: 10px;
  padding: 2em 5%;
  /* box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12); */
`
const Avatar = styled.div`
  background-color: #9b51e0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
`

const Input = styled.input`
  background-color: #f5f6f7;
  width: 320px;
  padding: 1rem 1.2rem;
  font-size: 1.1em;
  border-width: 1px;
  border-style: solid;
  border-color: lightgrey;
  font-size: 0.9rem;
  border-radius: 10px;
`

const Label = styled.label`
  display: block;
  width: 100%;
  margin-top: 20px;
  text-align: right;
`
const LabelTitle = styled.span`
  text-transform: uppercase;
  margin-right: 1em;
`
const FieldSet = styled.fieldset`
  margin: 2em 0;

  min-width: 66.6%;

  border-radius: 10px;
`
const Legend = styled.legend`
  font-size: 1.4rem;
  font-weight: bold;
`

const Button = styled.button`
  display: block;
  background-color: #9b51e0;
  padding: 0.8em 0.9em;
  min-width: 320px;
  border-radius: 20px;
  color: white;
  font-size: 1.2em;
  text-transform: uppercase;
  margin-left: auto;
`
const LabeledInput = ({ label, type, name, value, onChange }) => (
  <Label>
    <LabelTitle>{label}</LabelTitle>

    <Input type={type} value={value} name={name} onChange={onChange} />
  </Label>
)

function UserSettings() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [errors, setErrors] = useState([])

  return (
    <Container>
      <Form>
        <Avatar />
        <FieldSet>
          <div>
            <Legend>Personal Information</Legend>
          </div>
          <LabeledInput
            label="First Name"
            type="text"
            name="firstName"
            value={firstName}
          />
          <LabeledInput
            label="Last Name"
            type="text"
            name="lastName"
            value={lastName}
          />
        </FieldSet>
        <FieldSet>
          <div>
            <Legend>Account Settings</Legend>
          </div>
          <LabeledInput label="email" type="email" name="email" value={email} />
          <LabeledInput
            label="New Password"
            type="password"
            name="newPassword"
            value={newPassword}
          />
        </FieldSet>

        <FieldSet>
          <div>
            <Legend>TODO: needs to be changed </Legend>
          </div>
          <LabeledInput
            label="Current Password"
            type="password"
            name="currentPassword"
            value={currentPassword}
          />
        </FieldSet>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default UserSettings
