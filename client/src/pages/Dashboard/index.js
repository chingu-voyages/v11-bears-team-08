import React from 'react'
import styled from '@emotion/styled-base'
import Flex from '../../components/lib/Flex'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'

/*
    TO DO: FETCH USER, MESSAGES AND APPOINTMENTS DATA
        ==> THEN PROVIDE TO SIDEBAR
*/

export default () => (
  <Flex justify="flex-start" align="flex-start" direction="row">
    <Sidebar />
    <Chat />
  </Flex>
)
