import React from 'react'
import styled from '@emotion/styled'

export default UserFields

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

const ErrorText = styled.p`
  margin: 0 calc(10% + 10px);
  margin-top: -1em;
  color: red;
  font-size: 0.8rem;
  text-align: left;
  letter-spacing: 1px;
`

const Button = styled.button`
  margin: 1em 10%;
  padding: 1em 1.2em;
  border-radius: 25px;
  background: ${(props) => (props.trainer ? '#3BAE31' : '#4933EF')};
  color: white;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

function UserFields({
  userProps,
  setUserProps,
  errorsProps,
  setErrorsProps,
  buttonsProps,
  setIsTrainerSignup
}) {
  return (
    <>
      <h2>Register Today!</h2>
      <Input
        type="text"
        placeholder="First Name"
        value={userProps.firstName}
        onChange={(e) => setUserProps.setFirstName(e.target.value)}
        error={errorsProps.fNameError}
        onFocus={() => setErrorsProps.setFNameError('')}
        onBlur={validateFName}
      />
      {errorsProps.fNameError && (
        <ErrorText>{errorsProps.fNameError}</ErrorText>
      )}

      <Input
        type="text"
        placeholder="Last Name"
        value={userProps.lastName}
        onChange={(e) => setUserProps.setLastName(e.target.value)}
        error={errorsProps.lNameError}
        onFocus={() => setErrorsProps.setLNameError('')}
        onBlur={validateLName}
      />
      {errorsProps.lNameError && (
        <ErrorText>{errorsProps.lNameError}</ErrorText>
      )}

      <Input
        type="email"
        placeholder="Email"
        value={userProps.email}
        onChange={(e) => setUserProps.setEmail(e.target.value)}
        error={errorsProps.emailError}
        onFocus={() => setErrorsProps.setEmailError('')}
        onBlur={validateEmail}
      />
      {errorsProps.emailError && (
        <ErrorText>{errorsProps.emailError}</ErrorText>
      )}

      <Input
        type="password"
        placeholder="password"
        value={userProps.password}
        onChange={(e) => setUserProps.setPassword(e.target.value)}
        error={errorsProps.passwordError}
        onFocus={() => setErrorsProps.setPasswordError('')}
        onBlur={validatePassword}
      />
      {errorsProps.passwordError && (
        <ErrorText>{errorsProps.passwordError}</ErrorText>
      )}

      <Button
        type="button"
        trainer
        disabled={
          buttonsProps.isLoading ||
          !buttonsProps.isUserReady ||
          !buttonsProps.isUserInputValid
        }
        onClick={() => setIsTrainerSignup(true)}
      >
        Become a Trainer
      </Button>

      <Button
        disabled={
          buttonsProps.isLoading ||
          !buttonsProps.isUserReady ||
          !buttonsProps.isUserInputValid
        }
      >
        Register as a User
      </Button>
    </>
  )

  function validateFName(e) {
    if (/[^a-zA-Z]/gi.test(e.target.value)) {
      setErrorsProps.setFNameError('Invalid first name format')
    }
  }

  function validateLName(e) {
    if (/[^a-zA-Z]/gi.test(e.target.value)) {
      setErrorsProps.setLNameError('Invalid last name format')
    }
  }

  function validateEmail(e) {
    if (!e.target.value.includes('@')) {
      setErrorsProps.setEmailError('Invalid email format')
    }
  }

  function validatePassword(e) {
    if (e.target.value.length < 8) {
      setErrorsProps.setPasswordError('Password must be more than 8 characters')
    }
  }
}
