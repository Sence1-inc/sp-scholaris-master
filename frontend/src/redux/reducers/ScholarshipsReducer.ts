import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Scholarship } from '../types'

export interface Scholarships {
  scholarships: Scholarship[]
  total_count: number
  total_pages: number
  current_page: number
  limit: number
}

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
    initializeScholarships: (state, action: PayloadAction<Scholarship[]>) => {
      state.scholarships = action.payload
    },
  },
})

export const { initializeScholarships } = scholarshipsSlice.actions

export default scholarshipsSlice.reducer
