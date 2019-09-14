import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { mq } from '../../utils/responsiveUtils'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { theme } from '../../utils/theme'

const Nav = styled.nav`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  padding: 2rem;
  width: 100vw;
  max-width: 100vw;
`

const List = styled.ul`
  display: flex;

  li {
    margin-left: 2em;
  }

  a {
    color: ${theme.colors.primary};
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`

const Settings = styled.div`
  display: block;
  width: 1.25em;
  height: 1.25em;
  cursor: pointer;

  &:hover {
    svg {
      fill: ${theme.colors.secondary};
    }
  }
`

export default () => {
  return (
    <Router>
      <Nav>
        <List>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Settings>
              <svg
                viewBox="0 0 36 26"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
              >
                <path d="M8.887 2.716c0-.955.77-1.728 1.729-1.728h23.205c.955 0 1.729.767 1.729 1.728 0 .954-.769 1.728-1.729 1.728H10.616c-.954 0-1.729-.767-1.729-1.728zM2.469 4.937C1.105 4.937 0 3.832 0 2.469 0 1.105 1.105 0 2.469 0c1.363 0 2.469 1.105 2.469 2.469 0 1.363-1.106 2.468-2.469 2.468zm0 10.863C1.105 15.8 0 14.695 0 13.331c0-1.363 1.105-2.469 2.469-2.469 1.363 0 2.469 1.106 2.469 2.469 0 1.364-1.106 2.469-2.469 2.469zm0 9.875C1.105 25.675 0 24.57 0 23.206c0-1.363 1.105-2.469 2.469-2.469 1.363 0 2.469 1.106 2.469 2.469 0 1.364-1.106 2.469-2.469 2.469zm6.418-12.591c0-.954.77-1.728 1.729-1.728h23.205c.955 0 1.729.767 1.729 1.728 0 .955-.769 1.729-1.729 1.729H10.616c-.954 0-1.729-.768-1.729-1.729zm0 10.369c0-.954.77-1.728 1.729-1.728h23.205c.955 0 1.729.767 1.729 1.728 0 .955-.769 1.728-1.729 1.728H10.616c-.954 0-1.729-.767-1.729-1.728z" />
              </svg>
            </Settings>
          </li>
        </List>
      </Nav>
    </Router>
  )
}
