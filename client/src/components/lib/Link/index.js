import React from 'react'
import styled from '@emotion/styled'

const Link = styled.div`
  border-radius: 2px;
  background: blue;
  color: white;
  font-weight: 400;
  letter-spacing: 1px;
`

export default ({ children, url }) => <Link href={url}>{children}</Link>
