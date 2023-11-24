import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { moveToTrash, noteDelete, notePinnedToggle, restoreFromTrash, selectNote, selectPinnedNote, selectPinnedTrash, selectTagNote, selectTrash, selectUnpinnedNote, selectUnpinnedTrash, trashPinnedToggle } from '../reducers/noteListSlice';
import { useDispatch } from 'react-redux';
import './Note.css'
import NoteModal from './Modals/NoteModal';
import { tag } from '../reducers/tagSlice';
import DOMPurify from 'dompurify';
import NoteSortModal from './Modals/NoteSortModal';
interface NoteProps {
    isPinned: boolean;
    category: string;
    trash: boolean;
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
export default function Note({isPinned, category, trash}:NoteProps) {
    const tagNotes = useAppSelector(selectTagNote(category));
    const pinnedNotes = useAppSelector(selectPinnedNote);
    const unpinnedNotes = useAppSelector(selectUnpinnedNote);
    const pinnedTrash = useAppSelector(selectPinnedTrash);
    const unpinnedTrash = useAppSelector(selectUnpinnedTrash);
    const [sortedNotes, setSortedNotes] = useState<note[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [noteSortModalOpen, setNoteSortModalOpen] = useState(false);
    interface SafeHtmlContentProps {
        htmlString: string;
    }
    const SafeHtmlContent = ({ htmlString }: SafeHtmlContentProps) => {
        const cleanHtml = DOMPurify.sanitize(htmlString);
        return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
      };

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
    let notes : note[];
    if (category !== "" && !trash) {
        notes = tagNotes;
    } 
    else if (isPinned && !trash) {
        notes = pinnedNotes;
    } 
    else if (!isPinned && !trash) {
        notes = unpinnedNotes;
    }
    else if (isPinned && trash) {
        notes = pinnedTrash;
    }
    else  {
        notes = unpinnedTrash;
    }
    const dispatch = useDispatch();
    useEffect(() => {},notes);
    
    const [noteSort, setNoteSort] = useState("");
    const handleNoteSortChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setNoteSort(event.target.value);
    };
    const sortNotes = () => {
        // notes 배열의 복사본을 생성합니다.
        let sortedNotes = [...notes];
      
        // Priority 정렬
        if (noteSort === "lowToHigh") {
          sortedNotes.sort((a, b) => (a.priority > b.priority ? -1 : 1));
        } 
        else if (noteSort === "highToLow") {
          sortedNotes.sort((a, b) => (a.priority < b.priority ? -1 : 1));
        }
        // Date 정렬
        else if (noteSort === "latest") {
        sortedNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } 
        else if (noteSort === "created") {
        sortedNotes.sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime());
        } 
        else if (noteSort === "edited") {
        sortedNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
      
        // 정렬된 복사본을 사용합니다.
        setSortedNotes(sortedNotes);
      };
      
      useEffect(() => {
        const sortedNotes = sortNotes();
        // 정렬된 노트를 UI에 반영하기 위한 로직
        // 예를 들어, 상태를 업데이트하거나 정렬된 노트를 표시하는 로직을 추가합니다.
      }, [noteSort]);
      
      useEffect(() => {
        sortNotes();
    }, [notes, noteSort]);

    const toggleNotePin = (noteToToggle : note, event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 버블링을 중단시킴
        dispatch(notePinnedToggle(noteToToggle));
    }
    const toggleTrashPin = (noteToToggle : note, event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 버블링을 중단시킴
        console.log("토글");
        dispatch(trashPinnedToggle(noteToToggle));
    }
    const deleteNote = (noteToDelete : note, event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 버블링을 중단시킴
        dispatch(noteDelete(noteToDelete));
    }
    const editNoteHandler = (noteToEdit : note, event: React.MouseEvent) => {
        event.stopPropagation(); // 이벤트 버블링을 중단시킴
        setEditNote(noteToEdit);
        setIsEdit(true);
    }
    const noteToTrash = (trash : note, event: React.MouseEvent) =>{
        event.stopPropagation(); // 이벤트 버블링을 중단시킴
        dispatch(moveToTrash(trash.id));
    }
    const noteToRestore = (trash : note, event: React.MouseEvent) =>{
        event.stopPropagation(); // 이벤트 버블링을 중단시킴
        dispatch(restoreFromTrash(trash.id));
    }
    useEffect(() => {
        console.log(editNote);
    }, [editNote]);

    return (
        <div>
            {isEdit && <NoteModal setNoteModalOpen={setIsEdit} newNote={editNote} isEdit={isEdit} key={editNote.id}/>}
            {noteSortModalOpen && <NoteSortModal setNoteSortModalOpen={setNoteSortModalOpen} handleNoteSortChange={handleNoteSortChange} />}
            <div className='note_header'>
            {isPinned && category=== "" && <h1 className='note_title'>Pinned Note</h1>}
            {!isPinned && category=== "" &&<h1 className='note_title'>Unpinned Note</h1>}
            <button className='note_sort_btn note_btn' onClick={() => setNoteSortModalOpen(true)}>정렬</button>
            </div>
            <div className='notes_container'>
                {sortedNotes.map((note) => 
                <div key={note.id} className={`note_${note.color} note_container`} onClick={(event) => editNoteHandler(note,event)}>
                    <div className='note_header_container'>
                        <div className='note_header_title'>{note.title}</div>
                        <div className='note_header_info'>
                            <h3 className='note_priority'>{note.priority}</h3>
                            {note.pinned ? <button className='note_pinned note_btn' onClick={(event) => trash ? toggleTrashPin(note, event) : toggleNotePin(note, event)}>pinned</button> : <button className='note_unpinned note_btn' onClick={(event) => trash ? toggleTrashPin(note, event) : toggleNotePin(note, event)}>unpinned</button>}
                        </div>
                    </div>
                    <div className='note_vlaue'>
                        <SafeHtmlContent htmlString={note.value} />
                    </div>
                    <div className='note_tags'>
                        {note.tag.map((tag, index) => <p key={index} className='note_tag'>{tag.value}</p>)}
                    </div>
                    <div className='note_footer'>
                        <p className='note_date'>{note.date}</p>
                        <div className='note_footer_btns'>
                            <button className='note_edit_btn note_btn' onClick={(event) => editNoteHandler(note,event)}>edit</button>
                            {trash ? <button className='note_trash_btn note_btn' onClick={(event) => noteToRestore(note,event)}>restore</button> : <button className='note_trash_btn note_btn' onClick={(event) => noteToTrash(note,event)}>trash</button>}
                            <button className='note_delete_btn note_btn' onClick={(event) => deleteNote(note,event)}>delete</button>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}
