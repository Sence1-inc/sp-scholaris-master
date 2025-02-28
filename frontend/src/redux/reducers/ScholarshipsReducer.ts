/**
 * @file ScholarshipsReducer.ts
 * @description Redux slice for managing scholarships state.
 * This file defines the state shape and reducer logic for scholarships using Redux Toolkit.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Scholarship } from '../types'

/**
 * Interface representing the state for scholarships.
 *
 * @property {Scholarship[]} scholarships - An array of scholarship objects.
 * @property {number} total_count - The total number of scholarships.
 * @property {number} total_pages - The total number of pages available for scholarships.
 * @property {number} current_page - The current page in the pagination.
 * @property {number} limit - The number of scholarships per page.
 */
export interface Scholarships {
  scholarships: Scholarship[]
  total_count: number
  total_pages: number
  current_page: number
  limit: number
}

/**
 * Redux slice for managing scholarships state.
 *
 * @remarks
 * This slice provides actions and reducer functionality to initialize and update
 * the scholarships state within the Redux store.
 */
export const scholarshipsSlice: any = createSlice({
  name: 'scholarships',
  initialState: {
    scholarships: [],
    total_count: 0,
    total_pages: 0,
    current_page: 0,
    limit: 0,
  } as Scholarships,
  reducers: {
    /**
     * Initializes the scholarships state with the provided array of scholarship objects.
     *
     * @param state - The current state of scholarships.
     * @param action - A payload action containing an array of scholarship data.
     */
    initializeScholarships: (state, action: PayloadAction<Scholarship[]>) => {
      state.scholarships = action.payload
    },
  },
})

/**
 * Action creator for initializing scholarships.
 */
export const { initializeScholarships } = scholarshipsSlice.actions

/**
 * The reducer function for scholarships state management,
 * intended to be integrated into the Redux store.
 */
export default scholarshipsSlice.reducer
