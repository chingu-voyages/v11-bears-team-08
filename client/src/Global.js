import React from 'react'
import { Global, css } from '@emotion/core'
import { theme } from './utils/theme'

export default () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }

      body {
        font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;
      }

      a {
        text-decoration: ${theme.colors.primary};
      }
    `}
  />
)
