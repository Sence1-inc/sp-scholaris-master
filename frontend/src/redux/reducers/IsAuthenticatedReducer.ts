import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * A slice for managing the authentication status of the user.
 *
 * This slice contains a reducer function for initializing the authentication status.
 * It uses the createSlice function from @reduxjs/toolkit to create a slice of the Redux store.
 */
export const isAuthenticatedSlice = createSlice({
  name: 'isAuthenticated',
  initialState: false,
  reducers: {
    initializeIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

/**
 * An action creator for initializing the authentication status.
 *
 * This action creator is used to initialize the authentication status of the user.
 * It takes a boolean payload and returns a PayloadAction object.
 */
export const { initializeIsAuthenticated } = isAuthenticatedSlice.actions

export default isAuthenticatedSlice.reducer
