import React, { useEffect, useRef, useState } from 'react'
import './EditTagModal.css'
import useOnClickOutside, { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { selectTag, tagAdd, tagDelete } from '../../reducers/tagSlice';
interface EditTagModalProps {
    setEditTagModalOpen: (open: boolean) => void;
}
export default function EditTagModal( {setEditTagModalOpen} : EditTagModalProps) {
    const tags = useAppSelector(selectTag);
    const dispatch = useDispatch();

    const [newTagName, setNewTagName] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    //모달 외부 클릭 시 모달을 닫는 핸들러 설정
    useOnClickOutside(ref,() => {setEditTagModalOpen(false);});
    useEffect(() => {},[tags]);
    const onSubmitHandler =(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newTag = {
            id: new Date().getTime().toString(), // 현재 시간의 타임스탬프를 문자열로 변환
            value: newTagName
          };
        dispatch(tagAdd(newTag));
        setNewTagName("");
    }
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTagName(event.target.value);
    };

    return (
        <div className='modal_background'>
            <div ref={ref} className="modal_container">
                <div className='modal_header'>
                    <h1 className='modal_title'>Edit Tags</h1>
                    <button className='modal_close_btn' onClick={() =>setEditTagModalOpen(false)}>X</button>
                </div>
                <form className='modal_input_form' onSubmit={onSubmitHandler}>
                    <input type='text' className='modal_add_input' value={newTagName} placeholder="...new Tag Name" onChange={onChangeHandler}></input>
                </form>
                <ul className='modal_tag_list_container'>
                    {tags.map((tag) => 
                    <div className='modal_tag_container'>
                        <li className={`modal_tag_title ${tag.id}`}>{tag.value}</li>
                        <button className='modal_tag_delete_btn' onClick={() => dispatch(tagDelete(tag))}>X</button>
                    </div>)}
                </ul>
            </div>
        </div>
    );
}
