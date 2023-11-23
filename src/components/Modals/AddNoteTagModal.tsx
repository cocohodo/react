import React, { useRef } from 'react'
import './AddNoteTagModal.css'
import { selectTag, tag } from '../../reducers/tagSlice';
import useOnClickOutside, { useAppSelector } from '../../app/hooks';
import { note } from '../../reducers/noteListSlice';
interface noteTagProps {
    setAddTagModalOpen: (open: boolean) => void;
    noteAddTag: (tag:tag) => void;
    noteRemoveTag: (tag:tag) => void;
    nowNote : note;
}
export default function AddNoteTagModal({setAddTagModalOpen,noteAddTag, noteRemoveTag, nowNote}:noteTagProps) {
    const ref = useRef<HTMLDivElement>(null);
    //모달 외부 클릭 시 모달을 닫는 핸들러 설정
    useOnClickOutside(ref,() => {setAddTagModalOpen(false);});
    const tags = useAppSelector(selectTag);
    console.log(nowNote);
  return (
    <div ref={ref} className='note_tag_modal_container'>
        <div className='note_tag_modal_header'>
            <button className='note_tag_modal_btn' onClick={()=>setAddTagModalOpen(false)}>X</button>
        </div>
        <ul className='note_tag_modal_list'>
            {tags.map(tag => 
            <li className='note_tag_modal_list_item'>
                <h1 className='note_tag_modal_title'>{tag.value}</h1>
                {Array.isArray(nowNote.tag) && nowNote.tag.find(haveTag => tag.value === haveTag.value) 
                ? <button className='note_tag_modal_remove_btn note_tag_modal_btn' onClick={()=>noteRemoveTag(tag)}>-</button> 
                : <button className='note_tag_modal_add_btn note_tag_modal_btn' onClick={()=>noteAddTag(tag)}>+</button>}
            </li>
                
            )}
        </ul>
    </div>
  )
}
