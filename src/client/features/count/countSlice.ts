import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

export interface CountState {
  count: number;
}

export interface GlobalCountState {
  count: CountState;
}

const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 0,
  } as CountState,
  reducers: {
    plus(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    minus(state, action: PayloadAction<number>) {
      state.count -= action.payload;
    },
    times(state, action: PayloadAction<number>) {
      state.count *= action.payload;
    },
  },
});

export default countSlice.reducer;
export const { plus, minus, times } = countSlice.actions;
