/**
 * @file ProfileReducer.ts
 *
 * @description This file defines the Redux slice for managing the user profile state.
 * It utilizes Redux Toolkit's createSlice to easily create reducer functions and actions.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from '../types'

/**
 * Represents the provider's profile state.
 */
interface ProviderProfile {
  profile: Profile
}

/**
 * Redux slice responsible for managing the profile state.
 *
 * @remarks
 * The slice initializes its state with an empty profile. It provides actions
 * to update the profile state such as initializing the profile data.
 */
export const profileSlice: any = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
  } as ProviderProfile,
  reducers: {
    /**
     * Initializes the profile with the new data provided.
     *
     * @param state - The current state of the profile.
     * @param action - Action containing the new profile data as payload.
     */
    initializeProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload
    },
  },
})

/**
 * Action creator to initialize the user profile state.
 */
export const { initializeProfile } = profileSlice.actions

/**
 * The reducer function for profile state management,
 * designed to be integrated into the Redux store.
 */
export default profileSlice.reducer
