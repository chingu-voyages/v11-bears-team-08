import axios from 'axios'

let api

function initApi(token) {
  if (!token) {
    //init api without token
    api = axios.create({ baseURL: '/api' })
  } else {
    // if token exists then init authorized api
    api = axios.create({
      baseURL: '/api',
      headers: { authorization: `Bearer ${token}` }
    })
  }
}

const authApi = {
  async signup(formData) {
    const { data } = await api.post('/auth/signup', formData)

    if (!data.error) {
      // !TODO grab token
      initApi(data.token)
    }

    return data
  },

  async signin(formData) {
    const { data } = await api.post('/auth/signin', formData)

    if (!data.error) {
      // !TODO grab token
      initApi(data.token)
    }

    return data
  },

  async getCachedUser() {
    try {
      const { data } = await api.get('/auth/getCachedUser', {
        withCredentials: true
      })

      initApi(data.token)

      return data
    } catch (error) {
      if (error.response.status === 401) {
        // TODO repond with appropriate api
      }
    }
  }
}

export { initApi, authApi }
