import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

interface tag {
    id:string;
    value: string;
  }
export interface note {
  id:string;
  date: string;
  title: string;
  value: string;
  tag : tag[];
  color : string;
  priority : string;
  pinned : boolean;
}
function formatDateTime(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  const formattedDate = formatDateTime(new Date());

const initialState: note[] = [
  {id:"1",date:formatDateTime(new Date()),title:"1",value:"노트1",tag:[{id:"태그1",value:"태그1"}],color:"red",priority:"high",pinned:true},{id:"2",date:"2023-01-14",title:"2",value:"노트2",tag:[{id:"태그2",value:"태그2"}],color:"green",priority:"low",pinned:false}
  ,{id:"3",date:"2023-01-15",title:"3",value:"노트3",tag:[{id:"태그1",value:"태그1"},{id:"태그2",value:"태그2"}],color:"orange",priority:"low",pinned:false}
];

export const noteListSlice = createSlice({
  name: 'note',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    noteAdd: (state, action : PayloadAction<note>)  => {
      return [...state, action.payload];
    },
    noteDelete: (state, action : PayloadAction<note>) => {
      return state.filter(note => note.id !== action.payload.id);
    },
    notePinnedToggle: (state, action: PayloadAction<note>) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state[index].pinned = !state[index].pinned;
      }
    },
    noteEdit: (state, action: PayloadAction<note>) => {
      console.log(action.payload);
      const index = state.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});
export const selectNote = (state: RootState) => state.note;
export const selectPinnedNote = (state: RootState) => state.note.filter((note) => note.pinned !== false);
export const selectUnpinnedNote = (state: RootState) => state.note.filter((note) => note.pinned !== true);
export const selectTagNote = (tagValue: string) => {
  return (state: RootState) => state.note.filter(note => 
    note.tag.some(thisTag => thisTag.value === tagValue)
  );
};
export const { noteAdd, noteDelete, notePinnedToggle, noteEdit } = noteListSlice.actions;
export default noteListSlice.reducer;
