import React, { useRef, useState } from 'react'
import './NoteModal.css'
import { selectTag, tag } from '../../reducers/tagSlice';
import { note, noteAdd, noteEdit } from '../../reducers/noteListSlice';
import useOnClickOutside, { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import AddNoteTagModal from './AddNoteTagModal';
import Write from '../Write';
interface NoteModalProps {
    setNoteModalOpen: (open: boolean) => void;
    newNote: note;
    isEdit: boolean;
}
export default function NoteModal({setNoteModalOpen, newNote, isEdit} : NoteModalProps) {
    const dispatch = useDispatch();
    const [addTagModalOpen, setAddTagModalOpen] = useState(false);
    const [nowNote, setNowNote] = useState<note>(newNote ?? {
        id: "",
        date: "",
        title: "",
        value: "",
        tag: [],
        color: "white",
        priority: "low",
        pinned: false
    });

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
    

    const ref = useRef<HTMLDivElement>(null);
    //모달 외부 클릭 시 모달을 닫는 핸들러 설정
    useOnClickOutside(ref,() => {setNoteModalOpen(false);});
    const onColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // 색상 변경을 위한 상태 업데이트 함수를 호출합니다.
        setNowNote(prevNote => ({
            ...prevNote,
            color: e.target.value
        }));
    };
    const onPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // 우선순위 변경을 위한 상태 업데이트 함수를 호출합니다.
        setNowNote(prevNote => ({
            ...prevNote,
            priority: e.target.value
        }));
    };
    const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.id==='title') setNowNote(prevNote => ({
            ...prevNote, title: e.target.value
        }));
        else if(e.target.id==='value') setNowNote(prevNote => ({
            ...prevNote, value: e.target.value
        }));
    }

    const createNote = () => {
        let updatedNote = {
            ...nowNote,
            date: formatDateTime(new Date())
        };
    
        if (!isEdit) {
            updatedNote = {
                ...updatedNote, // updatedNote에 이미 date가 포함되어 있으므로, 여기서 다시 사용
                id: new Date().toISOString() // 더 적절한 고유 ID 생성 방법
            };
            dispatch(noteAdd(updatedNote));
        } else {
            dispatch(noteEdit(updatedNote));
        }
    
        setNoteModalOpen(false);
    };

    const noteAddTag = (newTag: tag) => {
        setNowNote(prevNote => ({
            ...prevNote,
            tag: [...prevNote.tag, newTag] // prevNote.tag 배열에 newTag를 추가
        }));
    };
    const noteRemoveTag = (tagIdToRemove:tag) => {
        setNowNote(prevNote => {
            // `id`가 `tagIdToRemove`와 일치하지 않는 태그만 필터링합니다.
            console.log(tagIdToRemove);
            const newTags = prevNote.tag.filter(tag => tag.id !== tagIdToRemove.id);
            return {
                ...prevNote,
                tag: newTags
            };
        });
    };

  return (
    <div className='note_modal_background'>
        <div ref={ref} className='note_modal_container'>
        {addTagModalOpen && <AddNoteTagModal setAddTagModalOpen={setAddTagModalOpen} noteAddTag={noteAddTag} noteRemoveTag={noteRemoveTag} nowNote={nowNote}></AddNoteTagModal>}
            <div className='note_modal_header'>
                <span className='note_modal_title'>노트 생성하기</span>
                <button className='note_modal_close_btn note_modal_btn' onClick={() => setNoteModalOpen(false)}>X</button>
            </div>
            <form className='note_modal_input_form'>
                <input id='title' type='text' value={nowNote.title} className='note_modal_title_input' placeholder="제목을 입력하세요." onChange={onChangeHandler}/>
                <Write nowNote={nowNote} setNowNote={setNowNote} />
                {/* <textarea id='value' value={nowNote.value} className={`note_modal_value note_modal_value_${nowNote.color}`} placeholder="내용을 입력하세요." onChange={onChangeHandler}/> */}
            </form>
            <div className='note_modal_tag_container'>
                {nowNote.tag.map(tag => <span className='note_modal_tag'>{tag.value}<button className='note_modal_btn note_modal_tag_delete_btn' onClick={() =>noteRemoveTag(tag)}>x</button></span>)}
            </div>
            <div className='note_modal_footer'>
                <button className='note_modal_footer_add_tag_btn' onClick={() => setAddTagModalOpen(true)}>Add tag</button>
                <div className='note_modal_background_color_container'>
                    <label className='note_modal_background_color_label'>배경색 : </label>
                    <form>
                        <select name='background_color' onChange={onColorChange} value={nowNote.color}>
                            <option value="white">하얀색</option>
                            <option value="red">빨간색</option>
                            <option value="blue">파란색</option>
                            <option value="green">연두색</option>
                            <option value="orange">주황색</option>
                        </select>
                    </form>
                </div>
                <div className='note_modal_priority_container'>
                    <label className='note_modal_priority_label'>우선순위 : </label>
                    <form>
                        <select name='priority' onChange={onPriorityChange} value={nowNote.priority}>
                            <option value="low">Low</option>
                            <option value="high">High</option>
                        </select>
                    </form>
                </div>
                <button className='note_modal_create_btn note_modal_btn' onClick={createNote}>노트 생성</button>
            </div>
        </div>
    </div>
  )
}
