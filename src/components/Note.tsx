import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { noteDelete, notePinnedToggle, selectNote, selectPinnedNote, selectTagNote, selectUnpinnedNote } from '../reducers/noteListSlice';
import { useDispatch } from 'react-redux';
import './Note.css'
import NoteModal from './Modals/NoteModal';
import { tag } from '../reducers/tagSlice';
interface NoteProps {
    isPinned: boolean;
    category: string;
}
interface note {
    id:string;
    date: string;
    title: string;
    value: string;
    tag : tag[];
    color : string;
    priority : string;
    pinned : boolean;
  }
export default function Note({isPinned, category}:NoteProps) {
    const tagNotes = useAppSelector(selectTagNote(category));
    const pinnedNotes = useAppSelector(selectPinnedNote);
    const unpinnedNotes = useAppSelector(selectUnpinnedNote);
    const [isEdit, setIsEdit] = useState(false);
    let newNote: note = {
        id: "",
        date: "",
        title: "",
        value: "",
        tag: [],
        color: "",
        priority: "",
        pinned: false
      };
    const [editNote, setEditNote] = useState(newNote);
    let notes;
    if (category !== "") {
        notes = tagNotes;
    } 
    else if (isPinned) {
        notes = pinnedNotes;
    } 
    else {
        notes = unpinnedNotes;
    }
    const dispatch = useDispatch();
    useEffect(() => {},notes);
    const toggleNotePin = (noteToToggle : note) => {
        dispatch(notePinnedToggle(noteToToggle));
    }
    const deleteNote = (noteToDelete : note) => {
        dispatch(noteDelete(noteToDelete));
    }
    const editNoteHandler = (noteToEdit : note) => {
        setEditNote(noteToEdit);
        setIsEdit(true);
    }
    useEffect(() => {
        console.log(editNote);
    }, [editNote]);

    return (
        <div>
            {isEdit && <NoteModal setNoteModalOpen={setIsEdit} newNote={editNote} isEdit={isEdit} key={editNote.id}/>}
            {isPinned && category=== "" && <h1 className='note_title'>Pinned Note</h1>}
            {!isPinned && category=== "" &&<h1 className='note_title'>unPinned Note</h1>}
            <div className='notes_container'>
                {notes.map((note) => 
                <div key={note.id} className={`note_${note.color} note_container`}>
                    <div className='note_header_container'>
                        <div className='note_header_title'>{note.title}</div>
                        <div className='note_header_info'>
                            <h3 className='note_priority'>{note.priority}</h3>
                            {note.pinned ? <button className='note_pinned note_btn' onClick={() => toggleNotePin(note)}>pinned</button> : <button className='note_unpinned note_btn' onClick={() => toggleNotePin(note)}>unpinned</button>}
                        </div>
                    </div>
                    <div className='note_vlaue'>
                        {note.value}
                    </div>
                    <div className='note_tags'>
                        {note.tag.map((tag, index) => <p key={index} className='note_tag'>{tag.value}</p>)}
                    </div>
                    <div className='note_footer'>
                        <p className='note_date'>{note.date}</p>
                        <div className='note_footer_btns'>
                            <button className='note_edit_btn note_btn' onClick={() => editNoteHandler(note)}>edit</button>
                            <button className='note_trash_btn note_btn'>trash</button>
                            <button className='note_delete_btn note_btn' onClick={() => deleteNote(note)}>delete</button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}
