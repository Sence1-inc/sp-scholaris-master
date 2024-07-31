import axios, { AxiosInstance } from 'axios'

export const baseURL =
  process.env.NODE_ENV !== 'development'
    ? process.env.REACT_APP_API_BASE_URL
    : 'http://localhost:5001'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
  },
})

let lastRefreshTime = Date.now()

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentTime = Date.now()
    const elapsedTimeSinceLastRefresh = currentTime - lastRefreshTime

    const isLoginRequest = error.config.url === '/api/v1/login'

    if (
      (!isLoginRequest && elapsedTimeSinceLastRefresh >= 4 * 60 * 1000) ||
      (error.response && error.response.status === 401)
    ) {
      const data = {}
      axios.post(`${baseURL}/api/v1/refresh`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })

      lastRefreshTime = currentTime
    }

    return Promise.reject(error)
  }
)

export default instance
