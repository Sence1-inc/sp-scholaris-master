import axios, { AxiosInstance } from 'axios'

const baseURL =
  process.env.NODE_ENV !== 'development'
    ? process.env.REACT_APP_API_BASE_URL
    : 'http://localhost:5001'

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': ['application/json', '*/*'],
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': '*',
  },
})

export default instance
