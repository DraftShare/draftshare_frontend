import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "src/05_shared/redux";
import { wordId } from "../api/types";

interface initialState {
  openWordId: null | wordId;
}
const initialState: initialState = {
  openWordId: null,
};

export const wordSlice = createSlice({
  name: "wordSlice",
  initialState,
  selectors: {
    selectOpenWordId: (state) => state.openWordId,
  },
  reducers: {
    openedWordCard: (state, action: PayloadAction<wordId>) => {
      state.openWordId = action.payload;
    },
    closedWordCard: (state) => {
      state.openWordId = null;
    },
  },
  extraReducers: () => {},
}).injectInto(rootReducer);

export const { openedWordCard, closedWordCard } = wordSlice.actions;
export const reducer = wordSlice.reducer;
