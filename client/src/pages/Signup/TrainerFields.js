import React, { useState } from 'react'
import styled from '@emotion/styled'

export default TrainerFields

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
        'invalid city selection, please choose from one of the suggestions'
      )
    }
  }
}