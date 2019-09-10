import axios from 'axios'

let api = axios.create({ baseURL: '/api' })

function exampleAPICall() {
  return api.get('/').then((res) => res.data)
}

export { exampleAPICall }
