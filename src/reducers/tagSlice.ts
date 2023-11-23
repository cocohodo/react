import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface tag {
  id:string;
  value: string;
}

const initialState: tag[] = [
  {id:"2023-01-13",value:"태그1"},{id:"2023-01-14",value:"태그2"}
];

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    tagAdd: (state, action : PayloadAction<tag>)  => {
      return [...state, action.payload];
    },
    tagDelete: (state, action : PayloadAction<tag>) => {
      return state.filter(tag => tag.value !== action.payload.value);
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     })
  //     .addCase(incrementAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
});
export const selectTag = (state: RootState) => state.tag;
export const { tagAdd, tagDelete } = tagSlice.actions;
export default tagSlice.reducer;
