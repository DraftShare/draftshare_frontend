import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "src/05_shared/redux";

interface ErrorState {
  error: string | null;
}

const initialState: ErrorState = {
  error: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  selectors: {
    selectError: (state) => state.error,
  },
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
}).injectInto(rootReducer);

export const { setError } = errorSlice.actions;
export const reducer = errorSlice.reducer;
