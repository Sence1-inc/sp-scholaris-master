/**
 * @file axiosConfig.ts
 * @description Configures and exports an Axios instance for making HTTP requests.
 * This module sets up a base URL, timeout, credentials, and common headers. It also
 * installs a response interceptor to automatically handle token expiration and forbidden
 * access errors.
 */

import axios, { AxiosInstance } from 'axios'
import { initializeUser, initialUserState } from './redux/reducers/UserReducer'
import store from './redux/store'

const LOCAL_API_URL = 'http://localhost:5001'

/**
 * Retrieves the base URL for API requests depending on the current environment.
 *
 * @returns {string} The API base URL.
 */
const getApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return LOCAL_API_URL;
  }
  return process.env.REACT_APP_API_BASE_URL || LOCAL_API_URL;
}

export const baseURL: string = getApiBaseUrl();

/**
 * Axios instance for making HTTP requests.
 *
 * @remarks
 * Configured with the base URL, timeout, credentials, and standard headers
 * used across API calls.
 *
 * @constant
 * @type {AxiosInstance}
 */
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

/**
 * Response interceptor for handling API errors.
 *
 * @remarks
 * The interceptor processes responses to take special actions when encountering
 * authentication errors or forbidden requests:
 *
 * - For login or registration endpoints, errors are directly rejected.
 * - For HTTP status codes 498 or 401 (indicating token expiration or unauthorized access),
 *   it attempts to refresh the token. On a successful refresh, the Redux store is updated
 *   with the new user data and the original request is retried.
 * - For HTTP status 403, the user is logged out and redirected to the sign-in page.
 */
instance.interceptors.response.use(
  /**
   * Handles successful responses.
   *
   * @param response - The successful response object.
   * @returns The response as received.
   */
  (response) => {
    return response
  },
  /**
   * Handles error responses.
   *
   * @param error - The error object rejected by the HTTP request.
   * @returns A promise that either retries the request after refreshed credentials or
   *          rejects with the encountered error.
   */
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
