import React from 'react'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import Search from '../../components/Search'
import { theme } from '../../utils/theme'

const wobble = keyframes`
  50% {
    transform: rotate(10deg);
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const TopLeftArt = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 32vw;
`

const BottomRightArt = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30vw;
`

const Logo = styled.h1`
  font-size: 4em;
  font-weight: 900;
  margin-bottom: 2rem;
`

const Description = styled.div`
  width: 100%;
  margin-top: 2rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: ${theme.colors.light};

  p {
    margin-bottom: 1rem;
    line-height: 2.25rem;
  }
`

const Info = styled.div`
  width: 40vw;
  position: relative;

  img {
    position: absolute;
  }
`

const Timer = styled.img`
  top: -8vw;
  right: 5vw;
  width: 30px;
  animation: ${wobble} 2s ease-in-out 0.25s infinite;
`

const Weight = styled.img`
  top: 10vw;
  right: -20vw;
  width: 70px;
  height: 60px;
  animation: ${wobble} 4s ease-in-out 0.5s infinite;
`

const Bottle = styled.img`
  top: 25vw;
  left: -20vw;
  width: 80px;
  animation: ${wobble} 3s ease-in-out 0.75s infinite;
`

export default () => (
  <Container>
    <TopLeftArt src={require('../../assets/img/top-left-art.svg')} alt="" />
    <BottomRightArt
      src={require('../../assets/img/bottom-right-art.svg')}
      alt=""
    />
    <Info>
      <Logo>GYMLY</Logo>
      <Search />
      <Timer
        src={require('../../assets/img/timer.svg')}
        alt="timer illustration"
      />
      <Weight
        src={require('../../assets/img/weight.svg')}
        alt="weight illustration"
      />
      <Bottle
        src={require('../../assets/img/bottle.svg')}
        alt="water bottle illustration"
      />
      <Description>
        <p>GMLY's aim is to help you find a fitness coach in you locale.</p>
        <p>
          To get started, simply type in you location in the search bar above,
          and we'll find you a coach :D
        </p>
      </Description>
    </Info>
  </Container>
)
