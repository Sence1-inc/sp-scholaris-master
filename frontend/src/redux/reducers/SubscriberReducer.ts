import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Subscriber {
  email: string
  user_type: string
  deleted_at?: string | null
}

const initialState: Subscriber = {
  email: '',
  user_type: '',
  deleted_at: null,
}

export const subscriberSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {
    initializeSubscirber: (state, action: PayloadAction<Subscriber>) => {
      return action.payload
    },
  },
})

export const { initializeSubscirber } = subscriberSlice.actions

export default subscriberSlice.reducer
