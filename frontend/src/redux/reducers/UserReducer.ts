/**
 * @file UserReducer.ts
 * @description Redux slice for managing user state.
 * This file defines the initial state and reducer logic for user management using Redux Toolkit.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { User } from '../types'

/**
 * The initial state for the user.
 *
 * @remarks
 * Contains user details such as birthdate, email, name, and other personal information.
 * It includes nested properties for role, scholarship provider, and student profile.
 */
export const initialState = {
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

/**
 * Redux slice for managing user state.
 *
 * @remarks
 * This slice provides an action to initialize or update user state with the supplied user data.
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Initializes the user state with the provided user data.
     *
     * @param _state - The current user state.
     * @param action - A payload action containing the complete user details.
     * @returns The updated user state.
     */
    initializeUser: (_state, action: PayloadAction<User>) => {
      return action.payload
    },
  },
})

/**
 * Action creator for initializing user state.
 */
export const { initializeUser } = userSlice.actions

/**
 * The reducer function for user state management.
 *
 * @remarks
 * Use this reducer when integrating user state management into the Redux store.
 */
export default userSlice.reducer
