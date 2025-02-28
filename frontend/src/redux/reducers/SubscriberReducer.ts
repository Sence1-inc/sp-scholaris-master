/**
 * @file SubscriberReducer.ts
 * @description Redux slice for managing the subscriber state.
 * This file defines the initial state, types, and reducer logic for the subscriber using Redux Toolkit.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Represents a subscriber record.
 *
 * @property {string} email - The email address of the subscriber.
 * @property {string} user_type - The type of the user, e.g., admin, regular.
 * @property {string} [deleted_at] - Optional timestamp indicating when the subscriber was deleted.
 */
interface Subscriber {
  email: string
  user_type: string
  deleted_at?: string
}

/**
 * Defines the initial state for the subscriber.
 */
const initialState: Subscriber = {
  email: '',
  user_type: '',
  deleted_at: '',
}

/**
 * Redux slice for managing subscriber state.
 *
 * @remarks
 * This slice provides an action to initialize or update the subscriber state.
 */
export const subscriberSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {
    /**
     * Initializes or updates the subscriber state with the provided payload.
     *
     * @param state - The current subscriber state.
     * @param action - Payload action containing the new subscriber data.
     * @returns The updated subscriber state.
     */
    initializeSubscirber: (state, action: PayloadAction<Subscriber>) => {
      return action.payload
    },
  },
})

/**
 * Action creator for initializing/updating the subscriber state.
 */
export const { initializeSubscirber } = subscriberSlice.actions

/**
 * The reducer function for subscriber state management,
 * intended to be integrated into the Redux store.
 */
export default subscriberSlice.reducer
