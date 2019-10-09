import React from 'react'
import styled from '@emotion/styled'

const Icon = styled.div`
  width: 1em;
  display: flex;
  margin-top: -5.5px;

  & > * {
    width: 100%;
    max-width: 100%;
  }
`

const Online = () => (
  <Icon>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <g
        id="status-online"
        data-name="Group 61"
        transform="translate(-200 -100)"
      >
        <g
          id="Path_32"
          data-name="Path 32"
          transform="translate(200 100)"
          fill="none"
        >
          <path d="M5,0A5,5,0,1,1,0,5,5,5,0,0,1,5,0Z" stroke="none" />
          <path
            d="M 5 1 C 2.794390201568604 1 1 2.794390201568604 1 5 C 1 7.205610275268555 2.794390201568604 9 5 9 C 7.205610275268555 9 9 7.205610275268555 9 5 C 9 2.794390201568604 7.205610275268555 1 5 1 M 5 0 C 7.761420249938965 0 10 2.238580226898193 10 5 C 10 7.761420249938965 7.761420249938965 10 5 10 C 2.238580226898193 10 0 7.761420249938965 0 5 C 0 2.238580226898193 2.238580226898193 0 5 0 Z"
            stroke="none"
            fill="#80d079"
          />
        </g>
        <circle
          id="Ellipse_5"
          data-name="Ellipse 5"
          cx="2"
          cy="2"
          r="2"
          transform="translate(203 103)"
          fill="#80d079"
        />
      </g>
    </svg>
  </Icon>
)

const Offline = () => (
  <Icon>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <g id="Group_62" data-name="Group 62" transform="translate(-200 -100)">
        <g
          id="Path_32"
          data-name="Path 32"
          transform="translate(200 100)"
          fill="none"
        >
          <path d="M5,0A5,5,0,1,1,0,5,5,5,0,0,1,5,0Z" stroke="none" />
          <path
            d="M 5 1 C 2.794390201568604 1 1 2.794390201568604 1 5 C 1 7.205610275268555 2.794390201568604 9 5 9 C 7.205610275268555 9 9 7.205610275268555 9 5 C 9 2.794390201568604 7.205610275268555 1 5 1 M 5 0 C 7.761420249938965 0 10 2.238580226898193 10 5 C 10 7.761420249938965 7.761420249938965 10 5 10 C 2.238580226898193 10 0 7.761420249938965 0 5 C 0 2.238580226898193 2.238580226898193 0 5 0 Z"
            stroke="none"
            fill="#c1c1c1"
          />
        </g>
        <circle
          id="Ellipse_5"
          data-name="Ellipse 5"
          cx="2"
          cy="2"
          r="2"
          transform="translate(203 103)"
          fill="#c1c1c1"
        />
      </g>
    </svg>
  </Icon>
)

export default ({ status }) => {
  if (status === 'online') return <Online />
  if (status === 'offline' || !status) return <Offline />
}
