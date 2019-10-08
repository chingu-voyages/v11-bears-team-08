import React, { useState } from 'react'
import styled from '@emotion/styled'
import { theme } from '../../utils/theme'

import Input from '../../components/lib/Input'
import Submit from '../../components/lib/Submit'

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`
const Art = styled.div`
  width: 50%;
  svg {
    width: 100%;
    padding: 3em;
  }
`

const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  background: ${theme.colors.lightblue};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Form = styled.form`
  width: 325px;
  height: 40%;
  border-radius: 2px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
  padding: 1.5em 2em;
  box-shadow: 10px 10px 0px rgba(255, 255, 255, 0.4);
  background: white;
`

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = (e) => e.preventDefault()

  return (
    <Container>
      <Art>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="836.313"
          height="756.279"
          viewBox="0 0 836.313 756.279"
        >
          <g id="login-art" transform="translate(-108.287 -196.363)">
            <g
              id="Ellipse_12"
              data-name="Ellipse 12"
              transform="translate(793 269)"
              fill="none"
              stroke="#ef336d"
              stroke-width="10"
              opacity="0.76"
            >
              <circle cx="54" cy="54" r="54" stroke="none" />
              <circle cx="54" cy="54" r="49" fill="none" />
            </g>
            <path
              id="Path_45"
              data-name="Path 45"
              d="M7281.507,925.88c120.361-62.9,198.761-1.388,200.643,0,85.492,63.073,187.755-61.937,139.284-126.03-95.381-85.706,71.76-134.081,63.271-199.586-55.687-82.262,92.924-237.09-95.424-263.479s-182.743,53.568-267.963-38.343c-27.969-30.164-66.942-44.8-133.446-35.449-36.982,5.2-272.051,58.434-218.041,132.9,108.685,149.851,38.53,177.689,23.824,190.472-1.256.851-81.789,115.463,6.629,170.248,35.456,21.969,46.825,81.159,97.554,114.49C7172.855,920.4,7152.545,972.557,7281.507,925.88Z"
              transform="translate(-6804.251 -23.026)"
              fill="#69fcb8"
            />
            <text
              id="_"
              data-name="💪"
              transform="translate(172.503 897.514) rotate(20)"
              fill="#fff"
              font-size="86"
              font-family="AppleColorEmoji, Apple Color Emoji"
            >
              <tspan x="0" y="0">
                💪
              </tspan>
            </text>
            <path
              id="Path_47"
              data-name="Path 47"
              d="M7281.507,925.88c120.361-62.9,198.761-1.388,200.643,0,85.492,63.073,187.755-61.937,139.284-126.03-95.381-85.706,71.76-134.081,63.271-199.586-55.687-82.262,92.924-237.09-95.424-263.479s-182.743,53.568-267.963-38.343c-27.969-30.164-66.942-44.8-133.446-35.449-36.982,5.2-272.051,58.434-218.041,132.9,108.685,149.851,38.53,177.689,23.824,190.472-1.256.851-81.789,115.463,6.629,170.248,35.456,21.969,46.825,81.159,97.554,114.49C7172.855,920.4,7152.545,972.557,7281.507,925.88Z"
              transform="translate(-6815.04 -47)"
              fill="#b2fad3"
            />
            <text
              id="WELCOME_SIGN_UP_AND_GET_CONNECTED_TO_A_COACH_NEAR_YOU"
              data-name="WELCOME !
SIGN UP AND GET 
CONNECTED TO A 
COACH NEAR YOU"
              transform="translate(140.534 389.877) rotate(5)"
              fill="#ef336d"
              font-size="89"
              font-family="Poppins-Bold, Poppins"
              font-weight="700"
            >
              <tspan x="0" y="0">
                WELCOME !
              </tspan>
              <tspan x="0" y="113">
                SIGN UP AND GET{' '}
              </tspan>
              <tspan x="0" y="226">
                CONNECTED TO A{' '}
              </tspan>
              <tspan x="0" y="339">
                COACH NEAR YOU
              </tspan>
            </text>
            <path
              id="Path_48"
              data-name="Path 48"
              d="M7219.64,278.913s30.487-14.655,65.222-9.115c15.929,2.54,38.3,12.71,49.084,25.234-7.137-1.228-27.114-12.751-51.294-16.118C7253.341,274.831,7219.64,278.913,7219.64,278.913Z"
              transform="translate(-6860.322 -44.142)"
              fill="#fff"
            />
            <path
              id="Path_49"
              data-name="Path 49"
              d="M7508.085,802.385s24.107,22.642,49.479,0C7528.217,838.47,7508.085,802.385,7508.085,802.385Z"
              transform="translate(-6814.992 66.331)"
              fill="#fff"
            />
            <path
              id="Polygon_2"
              data-name="Polygon 2"
              d="M25.5,0,51,109H0Z"
              transform="translate(730.424 861.431) rotate(-50)"
              fill="#4d37f3"
            />
            <path
              id="Polygon_3"
              data-name="Polygon 3"
              d="M25.5,0,51,109H0Z"
              transform="translate(279.705 266.427) rotate(130)"
              fill="#4d37f3"
            />
          </g>
        </svg>
      </Art>
      <FormContainer>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Email"
            icon={<img src={require('../../assets/icons/email.svg')} alt="" />}
            setValue={setEmail}
          />
          <Input
            placeholder="Password"
            icon={
              <img src={require('../../assets/icons/password.svg')} alt="" />
            }
            setValue={setPassword}
          />
          <Input
            placeholder="First Name"
            icon={<img src={require('../../assets/icons/notes.svg')} alt="" />}
            setValue={setFirstName}
          />
          <Input
            placeholder="Last Name"
            icon={<img src={require('../../assets/icons/notes.svg')} alt="" />}
            setValue={setLastName}
          />
          <Submit />
        </Form>
      </FormContainer>
    </Container>
  )
}
