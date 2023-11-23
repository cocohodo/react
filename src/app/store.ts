import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tagReducer from '../reducers/tagSlice';
import noteReducer from '../reducers/noteListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tag: tagReducer,
    note: noteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
