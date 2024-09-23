import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ScholarshipApplicationForm {
  provider_id: number | null
  student_email: string
  student_name: string
  user_message: string
  pdf_file?: File | null
}

const initialState: ScholarshipApplicationForm = {
  provider_id: null,
  student_email: '',
  student_name: '',
  user_message: '',
}

export const scholarshipApplicationFormSlice = createSlice({
  name: 'scholarshipApplicationForm',
  initialState,
  reducers: {
    initializeScholarshipApplicationForm: (
      state,
      action: PayloadAction<ScholarshipApplicationForm>
    ) => {
      return action.payload
    },
  },
})

export const { initializeScholarshipApplicationForm } =
  scholarshipApplicationFormSlice.actions

export default scholarshipApplicationFormSlice.reducer
