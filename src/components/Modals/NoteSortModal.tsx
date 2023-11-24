import React, { useEffect, useRef, useState } from 'react'
import './NoteSortModal.css'
import useOnClickOutside, { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { selectTag, tagAdd } from '../../reducers/tagSlice';
interface NoteSortModalProps {
    setNoteSortModalOpen: (open: boolean) => void;
    handleNoteSortChange: (evnet: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function NoteSortModal( {setNoteSortModalOpen, handleNoteSortChange} : NoteSortModalProps) {
    const dispatch = useDispatch();

    const [newTagName, setNewTagName] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    //모달 외부 클릭 시 모달을 닫는 핸들러 설정
    useOnClickOutside(ref,() => {setNoteSortModalOpen(false);});
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
    console.log("정렬창 오픈");

    return (
        <div className='note_sort_modal_background'>
            <div ref={ref} className="note_sort_modal_container">
                <div className='note_sort_modal_header'>
                    <h1 className='note_sort_modal_title'>정렬</h1>
                    <button className='note_sort_modal_clear_btn note_sort_modal_btn' onClick={() =>setNoteSortModalOpen(false)}>CLEAR</button>
                    <button className='note_sort_modal_close_btn note_sort_modal_btn' onClick={() =>setNoteSortModalOpen(false)}>X</button>
                </div>
                <form className='note_sort_modal_priority'>
                    <label className='note_sort_modal_priority_label'>Priority</label>
                    <label>
                        <input type='radio' name='sort' value='lowToHigh' onChange={handleNoteSortChange}/>
                        Low to High
                    </label>
                    <label>
                        <input type='radio' name='sort' value='highToLow' onChange={handleNoteSortChange}/>
                        High to Low
                    </label>
                    <label className='note_sort_modal_date_label'>Date</label>
                    <label>
                        <input type='radio' name='sort' value='latest' onChange={handleNoteSortChange}/>
                        Sort by Latest
                    </label>
                    <label>
                        <input type='radio' name='sort' value='created' onChange={handleNoteSortChange}/>
                        Sort by Created
                    </label>
                    <label>
                        <input type='radio' name='sort' value='edited' onChange={handleNoteSortChange}/>
                        Sort by Edited
                    </label>
                </form>
            </div>
        </div>
    );
}
