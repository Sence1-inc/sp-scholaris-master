import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScholarshipDatas } from "../types";

interface ScholarshipData {
  scholarshipData: ScholarshipDatas;
}

export const scholarshipDataSlice: any = createSlice({
  name: "scholarshipData",
  initialState: {
    scholarshipData: {},
  } as ScholarshipData,
  reducers: {
    initializeScholarshipData: (state, action: PayloadAction<ScholarshipDatas>) => {
      state.scholarshipData = action.payload;
    },
  },
});

export const { initializeScholarshipData } = scholarshipDataSlice.actions;

export default scholarshipDataSlice.reducer;