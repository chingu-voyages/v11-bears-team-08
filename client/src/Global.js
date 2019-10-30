import React from 'react'
import { Global, css } from '@emotion/core'
import { theme } from './utils/theme'

export default () => (
  <Global
    styles={css`
      html {
        font-size: 16px;
      }

      * {
        box-sizing: border-box;
      }

      // ::-webkit-input-placeholder {
      //   color: white;
      // }
      // ::-moz-placeholder {
      //   color: white;
      // }
      // :-ms-input-placeholder {
      //   color: white;
      // }
      // :-moz-placeholder {
      //   color: white;
      // }

      body {
        font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif;
        font-weight: 400;
        line-height: 1.45;
      }

      a {
        text-decoration: ${theme.colors.primary};
      }

      p {
        margin-bottom: 1.25em;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 2.75rem 0 1rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        line-height: 1.15;
      }

      h1 {
        margin-top: 0;
        font-size: 3.052em;
      }

      h2 {
        font-size: 2.441em;
      }

      h3 {
        font-size: 1.953em;
      }

      h4 {
        font-size: 1.563em;
      }

      h5 {
        font-size: 1.25em;
      }

      small,
      .text_small {
        font-size: 0.8em;
      }
    `}
  />
)
