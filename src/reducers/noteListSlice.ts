import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { stat } from 'fs';

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
interface NotesState {
  notes: note[];
  trash: note[];
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

  const initialState: NotesState = {
    notes: [
      {id:"1",date:formatDateTime(new Date()),title:"1",value:"노트1",tag:[{id:"태그1",value:"태그1"}],color:"red",priority:"high",pinned:true},
      {id:"2",date:"2023-01-14",title:"2",value:"노트2",tag:[{id:"태그2",value:"태그2"}],color:"green",priority:"low",pinned:false},
      {id:"3",date:"2023-01-15",title:"3",value:"노트3",tag:[{id:"태그1",value:"태그1"},{id:"태그2",value:"태그2"}],color:"orange",priority:"low",pinned:false}
    ],
    trash: []
  };

export const noteListSlice = createSlice({
  name: 'note',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    noteAdd: (state, action: PayloadAction<note>) => {
      // 상태의 `notes` 배열에 직접 변형을 가함
      state.notes.push(action.payload);
      // 아무것도 반환하지 않음 (Immer가 draft 상태를 처리)
    },
    noteDelete: (state, action: PayloadAction<note>) => {
      // 상태의 `notes` 배열에서 해당 요소를 제거함
      state.notes = state.notes.filter(note => note.id !== action.payload.id);
      // 새로운 배열을 할당함으로써 Immer에 의해 처리됨
      // 아무것도 반환하지 않음
    },
    notePinnedToggle: (state, action: PayloadAction<note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index].pinned = !state.notes[index].pinned;
      }
    },
    noteEdit: (state, action: PayloadAction<note>) => {
      console.log(action.payload);
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    moveToTrash: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex(note => note.id === action.payload);
      if (index !== -1) {
        // 해당 노트를 trash 배열로 이동
        state.trash.push(state.notes[index]);
        // 원래 notes 배열에서는 제거
        state.notes.splice(index, 1);
      }
    },
    // 휴지통에서 노트를 복원하는 액션
    restoreFromTrash: (state, action: PayloadAction<string>) => {
      const index = state.trash.findIndex(note => note.id === action.payload);
      if (index !== -1) {
        // 해당 노트를 notes 배열로 복원
        state.notes.push(state.trash[index]);
        // trash 배열에서는 제거
        state.trash.splice(index, 1);
      }
    },
    trashPinnedToggle: (state, action: PayloadAction<note>) => {
      const index = state.trash.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.trash[index].pinned = !state.trash[index].pinned;
      }
    },
  },
});
export const selectNote = (state: RootState) => state.note.notes;
export const selectTrash = (state: RootState) => state.note.trash;
export const selectPinnedTrash = (state: RootState) => state.note.trash.filter((note) => note.pinned !== false);
export const selectUnpinnedTrash = (state: RootState) => state.note.trash.filter((note) => note.pinned !== true);
export const selectPinnedNote = (state: RootState) => state.note.notes.filter((note) => note.pinned !== false);
export const selectUnpinnedNote = (state: RootState) => state.note.notes.filter((note) => note.pinned !== true);
export const selectTagNote = (tagValue: string) => {
  return (state: RootState) => state.note.notes.filter(note => 
    note.tag.some(thisTag => thisTag.value === tagValue)
  );
};
export const { noteAdd, noteDelete, notePinnedToggle, noteEdit, moveToTrash, restoreFromTrash, trashPinnedToggle } = noteListSlice.actions;
export default noteListSlice.reducer;
