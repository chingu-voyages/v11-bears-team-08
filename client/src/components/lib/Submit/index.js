import React from 'react'
import styled from '@emotion/styled-base'
import { theme } from '../../../utils/theme'

const Submit = styled.input`
  border: none;
  border-radius: 2px;
  background: ${theme.colors.secondary};
  padding: 0.25em;
`

export default () => <Submit type="submit" value="SUBMIT" />
