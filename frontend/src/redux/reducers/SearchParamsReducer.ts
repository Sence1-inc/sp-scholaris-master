import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Params } from "../types";

interface ParamsState {
  params: Params;
}

export const paramsSlice = createSlice({
  name: "params",
  initialState: {
    params: {},
  } as ParamsState,
  reducers: {
    initializeParams: (state, action: PayloadAction<Params>) => {
      state.params = action.payload;
    },
  },
});

export const { initializeParams } = paramsSlice.actions;

export default paramsSlice.reducer;
