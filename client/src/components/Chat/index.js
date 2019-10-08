import React, { useState, useEffect } from 'react'
import MessageInput from '../MessageInput'
import Messages from '../Messages'
import faker from 'faker'

export default () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  function sendMessage(e) {
    e.preventDefault()

    if (!input) return

    // display timing, hours & minutes only.
    const message = {
      me: true,
      text: input,
      date: getFullMinutes(),
      avatar: faker.internet.avatar()
    }

    // add message with existing messages.
    setMessages(messages.concat(message))

    // reset input.
    setInput('')

    // scroll bar to bottom div.
    setTimeout(() => {
      const container = document.querySelector('.messagesContainer')
      container.scrollTop = container.scrollHeight
    }, 100)
  }

  function handleChangeText(e) {
    setInput(e.target.value)
  }

  function getFullMinutes() {
    const today = new Date()
    const hours = today.getHours()
    let minutes = today.getMinutes()
    minutes = minutes > 9 ? minutes : '0' + minutes

    return `${hours}:${minutes}`
  }

  return (
    <div>
      <Messages messages={messages} />
      <MessageInput
        sendMessage={sendMessage}
        input={input}
        handleChangeText={handleChangeText}
      />
    </div>
  )
}
