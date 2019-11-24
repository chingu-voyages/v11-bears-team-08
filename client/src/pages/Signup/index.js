import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { authApi } from '../../services/api'
import { UserContext } from '../../App'

import registerImg from '../../assets/img/register.jpg'

const Container = styled.main`
  display: grid;
  grid-template-columns: 2fr 4fr;
`

const Picture = styled.div`
  height: 100vh;
  background-image: url(${registerImg});
  background-size: cover;
  background-position: center;
`

const Form = styled.form`
  display: grid;
  place-self: center;
  width: 400px;
  text-align: center;
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

export default function Signup() {
  const [, setUser] = useContext(UserContext)

  // user state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fNameError, setFNameError] = useState('')
  const [lNameError, setLNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // trainer state
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [city, setCity] = useState({ id: null, name: null, country: null })
  const [descriptionError, setDescriptionError] = useState('')
  const [experienceError, setExperienceError] = useState('')
  const [specialityError, setSpecialityError] = useState('')
  const [cityError, setCityError] = useState('')

  // controls which form fields appear, and which signup to trigger on submit
  const [isTrainerSignup, setIsTrainerSignup] = useState(false)

  // enables submitting the form only when eligible
  const [isLoading, setLoading] = useState(false)
  const isUserReady = Boolean(firstName && lastName && email && password)
  const isUserInputValid = !Boolean(
    fNameError || lNameError || emailError || passwordError
  )
  const isTrainerReady =
    isUserReady &&
    Boolean(description && experience && speciality && city.id && city.name)
  const isTrainerInputValid =
    isUserInputValid &&
    !Boolean(
      descriptionError || experienceError || specialityError || cityError
    )

  async function handleSubmit(e) {
    e.preventDefault()

    if (isLoading || !isUserReady || !isUserInputValid) {
      return
    }

    setLoading(true)
    const { error, user } = await authApi.signup({ email, password })

    if (error) {
      setLoading(false)
      if (error.field === 'firstName') return setFNameError(error.message)
      if (error.field === 'lastName') return setLNameError(error.message)
      if (error.field === 'email') return setEmailError(error.message)
      if (error.field === 'password') return setPasswordError(error.message)
    }

    setLoading(false)
    setUser(user)
  }

  // categorize props for more readability
  const userButtonsProps = { isLoading, isUserReady, isUserInputValid }
  const userProps = { firstName, lastName, email, password }
  const setUserProps = { setFirstName, setLastName, setEmail, setPassword }
  const userErrorsProps = { fNameError, lNameError, emailError, passwordError }
  const setUserErrorsProps = {
    setFNameError,
    setLNameError,
    setEmailError,
    setPasswordError
  }

  const trainerButtonsProps = { isLoading, isTrainerReady, isTrainerInputValid }
  const trainerProps = { description, experience, speciality, city }
  const setTrainerProps = {
    setDescription,
    setExperience,
    setSpeciality,
    setCity
  }
  const trainerErrorsProps = {
    descriptionError,
    experienceError,
    specialityError,
    cityError
  }
  const setTrainerErrorsProps = {
    setDescriptionError,
    setExperienceError,
    setSpecialityError,
    setCityError
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {isTrainerSignup ? (
          <TrainerFields
            trainerProps={trainerProps}
            setTrainerProps={setTrainerProps}
            errorsProps={trainerErrorsProps}
            setErrorsProps={setTrainerErrorsProps}
            buttonsProps={trainerButtonsProps}
            setIsTrainerSignup={setIsTrainerSignup}
          />
        ) : (
          <UserFields
            userProps={userProps}
            setUserProps={setUserProps}
            errorsProps={userErrorsProps}
            setErrorsProps={setUserErrorsProps}
            buttonsProps={userButtonsProps}
            setIsTrainerSignup={setIsTrainerSignup}
          />
        )}

        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Form>

      <Picture />
    </Container>
  )
}

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

const TextArea = styled.textarea`
  margin: 1em 10%;
  padding: 1em 1.2em;
  border: 1px lightgray solid;
  border-radius: 10px;
  background: #f5f6f7;
  font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
  transition: 0.2s ease-in-out;
  ${({ error }) => error && 'border-left: 10px red solid;'}
`

// TODO: call algolia and grab the city id + name
function TrainerFields({
  trainerProps,
  setTrainerProps,
  errorsProps,
  setErrorsProps,
  buttonsProps,
  setIsTrainerSignup
}) {
  // cityInput will be used to request a city by name using algolia, then
  // update the parent's city variable with an object containing its data
  const [cityInput, setCityInput] = useState(trainerProps.city.name || '')

  return (
    <>
      <h2>Complete your trainer info</h2>
      <TextArea
        placeholder="Description / Relevant Skills..."
        value={trainerProps.description}
        onChange={(e) => setTrainerProps.setDescription(e.target.value)}
        error={errorsProps.descriptionError}
        onFocus={() => setErrorsProps.setDescriptionError('')}
        onBlur={validateDescription}
      />
      {errorsProps.descriptionError && (
        <ErrorText>{errorsProps.descriptionError}</ErrorText>
      )}

      <TextArea
        placeholder="Professional Experience..."
        value={trainerProps.experience}
        onChange={(e) => setTrainerProps.setExperience(e.target.value)}
        error={errorsProps.experienceError}
        onFocus={() => setErrorsProps.setExperienceError('')}
        onBlur={validateExperience}
      />
      {errorsProps.experienceError && (
        <ErrorText>{errorsProps.experienceError}</ErrorText>
      )}

      <Input
        type="text"
        placeholder="Training type / Speciality"
        value={trainerProps.speciality}
        onChange={(e) => setTrainerProps.setSpeciality(e.target.value)}
        error={errorsProps.specialityError}
        onFocus={() => setErrorsProps.setSpecialityError('')}
        onBlur={validateSpeciality}
      />
      {errorsProps.specialityError && (
        <ErrorText>{errorsProps.specialityError}</ErrorText>
      )}

      <Input
        type="search"
        placeholder="City"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        error={errorsProps.cityError}
        onFocus={() => setErrorsProps.setCityError('')}
        onBlur={validateCity}
      />
      {errorsProps.cityError && <ErrorText>{errorsProps.cityError}</ErrorText>}

      <Button
        type="button"
        disabled={buttonsProps.isLoading}
        onClick={() => setIsTrainerSignup(false)}
      >
        Go back
      </Button>

      <Button
        trainer
        disabled={
          buttonsProps.isLoading ||
          !buttonsProps.isTrainerReady ||
          !buttonsProps.isTrainerInputValid
        }
      >
        Register as a Trainer
      </Button>
    </>
  )

  function validateDescription() {
    const { description } = trainerProps
    if (description.length > 500) {
      setErrorsProps.setDescriptionError(
        'description paragraph must be less than 500 characters'
      )
    }
  }

  function validateExperience() {
    const { experience } = trainerProps
    if (experience.length > 500) {
      setErrorsProps.setExperienceError(
        'professional experience paragraph must be less than 500 characters'
      )
    }
  }

  function validateSpeciality() {
    const { speciality } = trainerProps
    if (speciality.length < 4) {
      setErrorsProps.setSpecialityError(
        'speciality must be more than 4 characters'
      )
    }
  }

  // validates the object that we derive from algolia's suggestions
  // must have and id and a name
  function validateCity() {
    const { city } = trainerProps
    if (typeof city !== 'object' || !city.id || !city.name || !city.country) {
      setErrorsProps.setCityError(
        'invalid city selected, please choose from one of the suggestions'
      )
    }
  }
}
