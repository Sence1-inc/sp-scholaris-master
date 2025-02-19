import axios, { AxiosInstance } from 'axios'
import { initializeUser, initialUserState } from './redux/reducers/UserReducer'
import store from './redux/store'

export const baseURL =
  process.env.NODE_ENV !== 'development'
    ? process.env.REACT_APP_API_BASE_URL
    : 'http://localhost:5001'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
  },
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const isLoginRequest = error.config.url.includes('/api/v1/login')
    const isRegisterRequest = error.config.url.includes('/api/v1/register')

    if (isLoginRequest || isRegisterRequest) {
      return Promise.reject(error)
    }

    if (
      (error.response && error.response.status === 498) ||
      (error.response && error.response.status === 401)
    ) {
      const data = {}
      try {
        const response = await axios.post(`${baseURL}/api/v1/refresh`, data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })

        store.dispatch(initializeUser(response.data.user))

        return instance.request(error.config)
      } catch (refreshError: any) {
        store.dispatch(initializeUser(initialUserState))
        console.error('Failed to refresh token', refreshError)
      }
    }

    if (error.response && error.response.status === 403) {
      const email = store.getState().user.email_address

      await instance.post('/api/v1/logout', {
        email: email,
      })
      window.location.href = '/sign-in'
    }
    return Promise.reject(error)
  }
)

export default instance
