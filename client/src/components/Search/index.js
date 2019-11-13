import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { theme } from '../../utils/theme'
import AsyncSelect from 'react-select/async'
import { trainerApi } from '../../services/api'

const Form = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

const Icon = styled.img`
  display: block;
  position: absolute;
  width: 32px;
  height: auto;
  left: 0;
  top: 0;
`

const Input = styled.input`
  position: relative;
  padding: 1em;
  width: 100%;
  font-size: 1.25em;
  letter-spacing: 2px;
  background: ${theme.colors.dark};
  border-radius: 20px;
  color: white;
  outline: none;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
`

export default () => {
  const [searchText, setSearchText] = useState('')
  const [citiesOptions, setCitiesOptions] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await trainerApi.getCities('par')
  //     const formattedOptions = result.cities.map((city) => ({ value: city.id, label: `${city.name}, ${city.country}` }))
  //     console.log(formattedOptions)
  //     setCitiesOptions(formattedOptions)
  //   }
  //   fetchData()
  // }, [searchText])
  const promiseOptions = async (inputValue) => {
    const cities = await trainerApi.getCities(inputValue)
    const formattedCities = cities.cities.map((city) => ({
      value: city.id,
      label: city.name
    }))
    console.log(formattedCities)
    return formattedCities
  }

  return (
    <Form role="form">
      <Icon src={require('../../assets/img/search.svg')} alt="search button" />
      {/* <Input
      type="text"
      aria-label="search for coach by entering residence area name"
      placeholder="eg. Westminster"
    /> */}
      <AsyncSelect defaultOptions={true} loadOptions={promiseOptions} />
    </Form>
  )
}
