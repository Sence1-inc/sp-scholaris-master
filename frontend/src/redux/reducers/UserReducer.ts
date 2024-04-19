import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  role: {},
  scholarship_provider: {
    id: 0,
    provider_name: '',
    user_id: 0,
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<User>) => {
      return action.payload
    },
  },
})

export const { initializeUser } = userSlice.actions

export default userSlice.reducer
