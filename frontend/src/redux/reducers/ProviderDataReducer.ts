import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProviderData } from '../types'

interface Providers {
  provider: ProviderData
}

export const providerSlice: any = createSlice({
  name: 'provider',
  initialState: {
    provider: {},
  } as Providers,
  reducers: {
    initializeProvider: (state, action: PayloadAction<ProviderData>) => {
      state.provider = action.payload
    },
  },
})

export const { initializeProvider } = providerSlice.actions

export default providerSlice.reducer
