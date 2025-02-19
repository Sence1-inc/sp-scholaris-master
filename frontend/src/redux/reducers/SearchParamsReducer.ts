/**
 * @file SearchParamsReducer.ts
 * @description Redux slice for managing search parameters state.
 * This file defines the state shape and reducer logic for search parameters using Redux Toolkit.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Params } from '../types'

/**
 * Interface representing the state for search parameters.
 *
 * @property {Params} params - The search parameters.
 */
interface ParamsState {
  params: Params
}

/**
 * Redux slice for managing search parameters state.
 *
 * @remarks
 * Initializes state with default params as an empty object and provides an action to initialize parameters.
 */
export const paramsSlice = createSlice({
  name: 'params',
  initialState: {
    params: {},
  } as ParamsState,
  reducers: {
    /**
     * Initializes the search parameters state with the provided payload.
     *
     * @param state - The current search parameters state.
     * @param action - Payload containing the new search parameters.
     */
    initializeParams: (state, action: PayloadAction<Params>) => {
      state.params = action.payload
    },
  },
})

/**
 * Action creator for initializing search parameters.
 */
export const { initializeParams } = paramsSlice.actions

/**
 * The reducer function for search parameters state management,
 * intended to be integrated into the Redux store.
 */
export default paramsSlice.reducer
