import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Profile } from '../types'

interface ProviderProfile {
  profile: Profile
}

export const profileSlice: any = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
  } as ProviderProfile,
  reducers: {
    initializeProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload
    },
  },
})

export const { initializeProfile } = profileSlice.actions

export default profileSlice.reducer
