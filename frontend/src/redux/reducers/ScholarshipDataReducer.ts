import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ScholarshipData {
  scholarshipData: ScholarshipData
}

export const scholarshipDataSlice: any = createSlice({
  name: 'scholarshipData',
  initialState: {
    scholarshipData: {},
  } as ScholarshipData,
  reducers: {
    initializeScholarshipData: (
      state,
      action: PayloadAction<ScholarshipData>
    ) => {
      state.scholarshipData = action.payload
    },
  },
})

export const { initializeScholarshipData } = scholarshipDataSlice.actions

export default scholarshipDataSlice.reducer
