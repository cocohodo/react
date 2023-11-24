import React, { useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { selectNote } from '../reducers/noteListSlice';
import { useDispatch } from 'react-redux';
import Note from '../components/Note';
import { useParams } from 'react-router-dom';
import './TagPage.css'
import NoteModal from '../components/Modals/NoteModal';

export default function TagPage() {
    const { tagName } = useParams();
    const category = tagName ?? "";
    const notes = useAppSelector(selectNote);
    const dispatch = useDispatch();
    const [ noteModalOpen, setNoteModalOpen ] = useState(false);
    const isEdit = false;
  const onClickNoteAddBtn = () => {
    setNoteModalOpen(true);
  }
    if(category === "")
    return (
        <div className='tagpage_container'>태그가 존재하지 않습니다.</div>
    )
    return (
      <div className='tagpage_container'>
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
        <div className='tagpage_header_container'>
          <h1 className='tagpage_header_title'>{tagName}</h1>
          <button className='tagpage_header_btn' onClick={onClickNoteAddBtn}>+</button>
        </div>
        <div className='tagpage_note_container'>
          <Note isPinned={false} category={category} trash={false} />
        </div>
      </div>
    )
}
