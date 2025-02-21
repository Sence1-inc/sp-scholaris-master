/**
 * @file ScholarshipDataReducer.ts
 * @description Redux slice for managing the application's scholarship data.
 * This file defines the state shape and reducer for scholarship data using Redux Toolkit.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Represents the structure of the scholarship data.
 *
 * @remarks
 * This interface is currently defined recursively. Depending on the application's requirements,
 * further refinement might be necessary to avoid deep or infinite nesting.
 */
interface ScholarshipData {
  /**
   * The nested scholarship data.
   */
  scholarshipData: ScholarshipData
}

/**
 * Redux slice for managing scholarship data.
 *
 * @remarks
 * This slice provides reducer logic along with actions to initialize the scholarship data state.
 */
export const scholarshipDataSlice: any = createSlice({
  name: 'scholarshipData',
  initialState: {
    scholarshipData: {},
  } as ScholarshipData,
  reducers: {
    /**
     * Initializes the scholarship data state with the provided payload.
     *
     * @param state - The current state of scholarship data.
     * @param action - A payload action containing the new scholarship data.
     */
    initializeScholarshipData: (
      state,
      action: PayloadAction<ScholarshipData>
    ) => {
      state.scholarshipData = action.payload
    },
  },
})

/**
 * Action creator for initializing scholarship data.
 */
export const { initializeScholarshipData } = scholarshipDataSlice.actions

/**
 * The reducer function for scholarship data management,
 * which is intended to be integrated into the Redux store.
 */
export default scholarshipDataSlice.reducer
