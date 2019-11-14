import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { theme } from '../../utils/theme'
import Select from 'react-select'
import { trainerApi } from '../../services/api'

const Form = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

// const Icon = styled.img`
//   display: block;
//   position: absolute;
//   width: 32px;
//   height: auto;
//   left: 0;
//   top: 0;
// `

// const Input = styled.input`
//   position: relative;
//   padding: 1em;
//   width: 100%;
//   font-size: 1.25em;
//   letter-spacing: 2px;
//   background: ${theme.colors.dark};
//   border-radius: 20px;
//   color: white;
//   outline: none;
//   box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
// `

const selectStyles = {
  valueContainer: (styles) => ({ padding: '1em', border: 'none' })
}

export default () => {
  const [searchText, setSearchText] = useState('')
  const [citiesOptions, setCitiesOptions] = useState([])
  const [selectedOptionId, setSelectedOptionId] = useState(null)

  const formatCitiesOptions = (options) =>
    options &&
    options.map((city) => ({
      value: city.id,
      label: `${city.name}, ${city.county ? city.county + ', ' : ''} ${
        city.administrative
      }, ${city.country} `
    }))

  useEffect(() => {
    const fetchCitiesOptions = async () => {
      const citiesOptions = await trainerApi.getCities(searchText)
      const formattedCitiesOptions = formatCitiesOptions(citiesOptions)
      setCitiesOptions(formattedCitiesOptions)
    }
    fetchCitiesOptions()
  }, [searchText])

  return (
    <Form role="form">
      <Select
        aria-label="search for coach by entering residence city name"
        placeholder="Search for a coach by city. e.g. Paris"
        options={citiesOptions}
        inputValue={searchText}
        onInputChange={(inputValue) => setSearchText(inputValue)}
        onChange={(optionPicked) =>
          optionPicked
            ? setSelectedOptionId(optionPicked.value)
            : setSelectedOptionId(null)
        }
        isClearable="true"
        escapeClearsValue="true"
        blurInputOnSelect
        styles={selectStyles}
      />
    </Form>
  )
}
