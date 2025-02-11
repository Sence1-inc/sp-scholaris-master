/**
 * @file axiosConfig.ts
 * @description Configures and exports an Axios instance for making HTTP requests.
 * This module sets up a base URL, timeout, credentials, and common headers. It also
 * installs a response interceptor to automatically handle token expiration and forbidden
 * access errors.
 */
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { initializeUser, initialUserState } from './redux/reducers/UserReducer'
import store from './redux/store'

const LOCAL_API_URL = 'http://localhost:5001'

/**
 * @interface ApiError
 * @description Interface for API error responses
 * @property {string} message - The error message 
 * @property {number} status - The HTTP status code
 * @property {string} code - The error code
 */
interface ApiError {
  message: string
  status: number
  code?: string
  response?: AxiosResponse
}

/**
 * @class CustomApiError
 * @description Custom error class for API errors
 * @param {ApiError} error - The error object
 * @param {number} status - The HTTP status code
 * @param {string} code - The error code
 */
export class CustomApiError extends Error {
  status: number;
  code?: string;
  response?: AxiosResponse
  
  /**
   * @constructor
   * @param {ApiError} error - The error object
   * @param {number} status - The HTTP status code
   * @param {string} code - The error code
   */
  constructor(error: ApiError) {
    super(error.message);
    this.status = error.status;
    this.code = error.code;
    this.response = error.response;
  }
}

const getApiBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return LOCAL_API_URL
  }
  return process.env.REACT_APP_API_BASE_URL || LOCAL_API_URL
}

/**
 * @function handleAuthError
 * @description Handles authentication errors by refreshing the token
 * @param {AxiosError} error - The error object
 * @returns {Promise<boolean>} True if the token was refreshed, false otherwise
 * @throws {CustomApiError} If the token refresh fails
 * @throws {AxiosError} If the token refresh fails
 * @throws {Error} If the token refresh fails
 */
const handleAuthError = async (error: AxiosError) => {
  const { response } = error

  if (response?.status === 498 || response?.status === 401) {
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/refresh`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )

      store.dispatch(initializeUser(response.data.user))
      return true
    } catch (refreshError) {
      store.dispatch(initializeUser(initialUserState))
      throw new CustomApiError({
        message: 'Session expired. Please login again.',
        status: 401,
        code: 'SESSION_EXPIRED'
      })
    }
  }
  return false
}

/**
 * @function handleForbiddenError
 * @description Handles forbidden errors by logging out the user
 * @param {AxiosError} error - The error object
 * @throws {CustomApiError} If the user is forbidden
 * @throws {Error} If the user is forbidden
 */
const handleForbiddenError = async (error: AxiosError) => {
  if (error.response?.status === 403) {
    const email = store.getState().user.email_address
    await instance.post('/api/v1/logout', { email })
    window.location.href = '/sign-in'
    throw new CustomApiError({
      message: 'Access forbidden. You have been logged out.',
      status: 403,
      code: 'FORBIDDEN_ACCESS'
    })
  }
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
  async (error: AxiosError) => {
    const isAuthRequest = ['/api/v1/login', '/api/v1/register'].some((path) =>
      error.config?.url?.includes(path)
    )

    if (isAuthRequest) {
      return Promise.reject(error)
    }

    try {
      const isRefreshSuccessful = await handleAuthError(error)
      if (isRefreshSuccessful) {
        return instance.request(error.config!)
      }

      await handleForbiddenError(error)

      throw new CustomApiError({
        message: (error.response?.data as { message?: string })?.message || 'An unexpected error occurred',
        status: error.response?.status || 500,
        code: error.code,
        response: error.response
      })
    } catch (handledError) {
      return Promise.reject(handledError)
    }
  }
)

export default instance
