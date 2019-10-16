import React, { useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  background-color: whitesmoke;
  height: 100vh;
  display: grid;
  place-items: center;
`

const Form = styled.form`
  background-color: white;
  height: 80%;
  width: 80%;
  padding: 2em 5%;
`
const Avatar = styled.div`
  background-color: #9b51e0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
`

const Input = styled.input`
  background-color: white;
  width: 400px;
  padding: 5px 10px;
  font-size: 1.1em;
`

const Label = styled.label`
  display: block;
  width: 100%;
  margin-top: 20px;
  text-align: right;
`
const FieldSet = styled.fieldset`
  background-color: whitesmoke;

  margin: 2em 0;
`

const Button = styled.button`
  display: block;
  background-color: #9b51e0;
  padding: 0.8em 0.9em;
  min-width: 200px;
  border-radius: 20px;
  color: white;
  font-size: 1.2em;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: 5%;
`
const LabeledInput = ({ label, type, name, value, onChange }) => (
  <Label>
    {label}

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
            <legend>Personal Information</legend>
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
            <legend>Account Settings</legend>
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
            <legend>TODO: needs to be changed </legend>
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
