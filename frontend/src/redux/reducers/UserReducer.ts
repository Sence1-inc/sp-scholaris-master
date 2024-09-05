import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { User } from '../types'

const initialState = {
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (_state, action: PayloadAction<User>) => {
      return action.payload
    },
  },
})

export const { initializeUser } = userSlice.actions

export default userSlice.reducer
