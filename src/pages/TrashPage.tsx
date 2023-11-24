import React, { useState } from 'react'
import './MainPage.css'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { selectTrash } from '../reducers/noteListSlice';
import Note from '../components/Note';
import NoteModal from '../components/Modals/NoteModal';

export default function TrashPage() {
  const notes = useAppSelector(selectTrash);
  const dispatch = useDispatch();
  const [ noteModalOpen, setNoteModalOpen ] = useState(false);
  const isEdit = false;
  const onClickNoteAddBtn = () => {
    setNoteModalOpen(true);
  }
  return (
    <div className='main_container'>
      {noteModalOpen && <NoteModal setNoteModalOpen={setNoteModalOpen} newNote={{
        id: "",
        date: "",
        title: "",
        value: "",
        tag: [],
        color: "white",
        priority: "low",
        pinned: false
      }} isEdit={isEdit}/>}
      <div className='main_header_container'>
        <h1 className='main_header_title'>Trash</h1>
        <button className='main_header_btn' onClick={onClickNoteAddBtn}>+</button>
      </div>
      <div className='main_note_container'>
        <Note isPinned={true} category={""} trash={true} />
        <Note isPinned={false} category={""} trash={true} />
      </div>
    </div>
  )
}
