import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Scholarship } from '../types'

interface Scholarships {
  scholarships: Scholarship[]
}

export const scholarshipsSlice: any = createSlice({
  name: 'scholarships',
  initialState: {
    scholarships: [],
  } as Scholarships,
  reducers: {
    initializeScholarships: (state, action: PayloadAction<Scholarship[]>) => {
      state.scholarships = action.payload
    },
  },
})

export const { initializeScholarships } = scholarshipsSlice.actions

export default scholarshipsSlice.reducer
