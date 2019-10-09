/* 
  TODO --> FETCH DATA WITH USE EFFECT
*/

import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import UserInfo from './UserInfo'
import Container from './Container'
import H2 from './H2'
import User from './User'
import Appointment from './Appointment'

const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  width: 325px;
  background: #333333;
  min-height: 100vh;
  height: 100%;
`

const Content = styled.div`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  width: calc(100% - 2em);
  height: 100%;
  & > * {
    margin-bottom: 2em;
  }
`

const appointments = [
  {
    title: '5k Tempo Run',
    startTime: '08:00',
    endTime: '8:40',
    coach: 'Jane Donut',
    avatarUrl:
      'https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
  },
  {
    title: '3k Tempo Run',
    startTime: '08:00',
    endTime: '10:00',
    coach: 'Jane Donut',
    avatarUrl:
      'https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
  },
  {
    title: '10k Tempo Run',
    startTime: '08:00',
    endTime: '9:30',
    coach: 'Jane Donut',
    avatarUrl:
      'https://images.unsplash.com/photo-1498529605908-f357a9af7bf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
  }
]

const messages = [
  {
    title: '5k Tempo Run',
    description: 'Jane Donut',
    location: 'New York, New Jersey',
    avatarUrl:
      'https://images.unsplash.com/photo-1495147334217-fcb3445babd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80'
  },
  {
    title: '10k Tempo Run',
    description: 'Jane Donut',
    location: 'New York, New Jersey',
    avatarUrl:
      'https://images.unsplash.com/photo-1495147334217-fcb3445babd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80'
  }
]

export default () => (
  <Sidebar>
    <Content>
      <UserInfo name="Kate" status={'online'} />
      <H2>upcoming appointments</H2>
      <Container data={appointments} component={Appointment} />
      <H2>messages</H2>
      <Container data={messages} component={User} />
    </Content>
  </Sidebar>
)
