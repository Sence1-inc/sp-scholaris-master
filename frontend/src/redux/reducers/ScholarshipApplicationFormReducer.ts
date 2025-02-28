/**
 * @file ScholarshipApplicationFormReducer.ts
 * @description Redux slice for managing the state of the scholarship application form.
 * This file defines the types, initial state, and reducer for the scholarship application form.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Represents the structure of a scholarship application form.
 *
 * @property {number | null} provider_id - The ID of the provider. Can be null if not set.
 * @property {string} student_email - The email address of the student.
 * @property {string} student_name - The full name of the student.
 * @property {string} user_message - A custom message provided by the user.
 * @property {File | null} [pdf_file] - An optional PDF file attached with the application.
 */
export type ScholarshipApplicationForm = {
  provider_id: number | null
  student_email: string
  student_name: string
  user_message: string
  pdf_file?: File | null
}

/**
 * The initial state of the Scholarship Application Form.
 */
const initialState: ScholarshipApplicationForm = {
  provider_id: null,
  student_email: '',
  student_name: '',
  user_message: '',
}

/**
 * Redux slice for managing scholarship application form state.
 *
 * @remarks
 * This slice provides an action to initialize the scholarship application form state.
 */
export const scholarshipApplicationFormSlice = createSlice({
  name: 'scholarshipApplicationForm',
  initialState,
  reducers: {
    /**
     * Initializes the scholarship application form state with the provided payload.
     *
     * @param state - The current state of the scholarship application form.
     * @param action - A payload action containing the new scholarship application form state.
     * @returns The updated state of the scholarship application form.
     */
    initializeScholarshipApplicationForm: (
      state,
      action: PayloadAction<ScholarshipApplicationForm>
    ) => {
      return action.payload
    },
  },
})

/**
 * Action creator for initializing the scholarship application form.
 */
export const { initializeScholarshipApplicationForm } =
  scholarshipApplicationFormSlice.actions

/**
 * The reducer function for managing scholarship application form state.
 */
export default scholarshipApplicationFormSlice.reducer
