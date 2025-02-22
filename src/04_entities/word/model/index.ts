import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "src/05_shared/redux";
import { cardId } from "../api/types";

interface initialState {
  openWordId: null | cardId;
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
    openedWordCard: (state, action: PayloadAction<cardId>) => {
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
