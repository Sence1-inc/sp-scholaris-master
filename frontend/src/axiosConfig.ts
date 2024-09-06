import axios, { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
import { initializeUser } from './redux/reducers/UserReducer'
import store from './redux/store'

export const initialUserState = {
  birthdate: '',
  email_address: '',
  first_name: '',
  id: 0,
  is_active: 0,
  last_name: '',
  role_id: 0,
  session_token: '',
  role: {
    id: 0,
    role_name: '',
  },
  scholarship_provider: {
    id: 0,
    provider_name: '',
    user_id: 0,
  },
  student_profile: {
    about: '',
    full_name: '',
    birthdate: dayjs(new Date()),
    email: '',
    age: 0,
    nationality: '',
    gender: '',
    state: '',
    secondary_school_name: '',
    secondary_school_year: '',
    secondary_school_address: '',
    secondary_school_phone_number: '',
    secondary_school_awards: '',
    secondary_school_organizations: '',
    elementary_school_name: '',
    elementary_school_year: '',
    elementary_school_address: '',
    elementary_school_phone_number: '',
    elementary_school_awards: '',
    elementary_school_organizations: '',
    guardian_full_name: '',
    guardian_contact_number: '',
    guardian_relationship: '',
  },
}

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
      const email = store.getState().persistedReducer.user.email_address

      await instance.post('/api/v1/logout', {
        email: email,
      })
      window.location.href = '/sign-in'
    }
    return Promise.reject(error)
  }
)

export default instance
