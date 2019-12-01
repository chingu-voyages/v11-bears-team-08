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

// collection of authentication methods
const authApi = {
  async signup(formData) {
    let { data } = await api.post('/auth/signup', formData)

    // get user info to return it back and authorize api
    if (!data.error) {
      initApi(data.token)
      data = (await api.get('/auth/getLoggedUser')).data
    }

    return data
  },

  async signin(formData) {
    let { data } = await api.post('/auth/signin', formData)

    // get user info to return it back and authorize api
    if (!data.error) {
      initApi(data.token)
      data = (await api.get('/auth/getLoggedUser')).data
    }

    return data
  },

  async getCachedUser() {
    try {
      let { data, status } = await api.get('/auth/getCachedToken', {
        withCredentials: true
      })

      // status 204 means there is no cookie, meaning the user is not logged in
      if (status === 204) {
        return Promise.resolve({ user: null })
      }

      initApi(data.token)
      data = (await api.get('/auth/getLoggedUser')).data

      return data
    } catch (error) {
      if (error.response.status === 401) {
        return Promise.resolve({ user: null })
      }
    }
  }
}

const trainerApi = {
  // FIXME: replace by real api call
  async getCities(text) {
    const cities = [
      { id: 1, name: 'first city', country: 'The rising sun' },
      { id: 2, name: 'last city', country: 'The setting sun' },
      { id: 3, name: 'popular city', country: 'The looming dawn' }
    ]
    return Promise.resolve({ cities })
  }
}
export { initApi, authApi, trainerApi }
