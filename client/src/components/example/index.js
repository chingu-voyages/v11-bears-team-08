import React, { useState, useEffect } from 'react'
import { exampleAPICall } from '../../services/api'

export default function Example() {
  const [serverResponse, setResponse] = useState(null)
  useEffect(() => {
    exampleAPICall().then(({ message }) => setResponse(message))
  }, [])

  return serverResponse && <p>Server response: {serverResponse}</p>
}
