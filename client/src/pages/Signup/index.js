import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import UserFields from './UserFields'
import TrainerFields from './TrainerFields'
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

    // only submit when not loading and the required fields are filled+valid
    if (isTrainerSignup) {
      if (isLoading || !isTrainerReady || !isTrainerInputValid) {
        return
      }
    } else {
      if (isLoading || !isUserReady || !isUserInputValid) {
        return
      }
    }

    let signupData = { firstName, lastName, email, password }
    if (isTrainerSignup) {
      signupData = { ...signupData, description, experience, speciality, city }
      signupData.type = 'trainer'
    }

    setLoading(true)
    const { error, user } = await authApi.signup(signupData)

    if (error) {
      setLoading(false)
      const { field, message } = error
      if (field === 'firstName') return setFNameError(message)
      if (field === 'lastName') return setLNameError(message)
      if (field === 'email') return setEmailError(message)
      if (field === 'password') return setPasswordError(message)
      if (field === 'description') return setDescriptionError(message)
      if (field === 'experience') return setExperienceError(message)
      if (field === 'speciality') return setSpecialityError(message)
      if (field === 'city') return setCityError(message)
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
