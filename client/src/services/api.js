import axios from 'axios'

let api = axios.create({ baseURL: '/api' })

const authApi = {
  async signup(formData) {
    const { data } = await api.post('/auth/signup', formData)

    if (!data.error) {
      // !TODO grab token
      // api() data.token
    }

    return data
  },

  async signin(formData) {
    const { data } = await api.post('/auth/signin', formData)

    if (!data.error) {
      // !TODO grab token
      // api() data.token
    }

    return data
  },

  async getCachedUser() {
    try {
      const { data } = await api.get('/auth/getCachedUser', {
        withCredentials: true
      })

      return data
    } catch (error) {
      if (error.response.status === 401) {
        // TODO repond with appropriate api
      }
    }
  }
}

export { authApi }
