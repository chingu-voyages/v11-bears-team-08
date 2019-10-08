import React from 'react'
import styled from '@emotion/styled'
import { theme } from '../../../utils/theme'

const Submit = styled.input`
  border: none;
  border-radius: 2px;
  background: ${theme.colors.dark};
  padding: 0.5em 0.7em;
  color: white;
  font-size: 0.75em;
  align-self: flex-start;
   {
    /* positioned to the left */
  }
  cursor: pointer;
   {
    /* Cuz duh! */
  }
`

export default () => <Submit type="submit" value="SUBMIT" />
