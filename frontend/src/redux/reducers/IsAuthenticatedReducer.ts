import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const isAuthenticatedSlice = createSlice({
  name: 'isAuthenticated',
  initialState: false,
  reducers: {
    initializeIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { initializeIsAuthenticated } = isAuthenticatedSlice.actions

export default isAuthenticatedSlice.reducer
