import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // React Quill 스타일
import { note } from '../reducers/noteListSlice';

interface WriteProps {
    nowNote: note;
    setNowNote: React.Dispatch<React.SetStateAction<note>>;
  }
export default function Write({nowNote,setNowNote}: WriteProps) {
    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
    
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
    
          ['clean'],                                         // remove formatting button
          ['link', 'image', 'video']                         // link and image, video
        ],
      };
    const valueChange = (html : string) => {
        setNowNote(prevNote => ({
            ...prevNote, value: html
        }));
    }
    return (
        <div>
            <ReactQuill
                value={nowNote.value}
                className={`note_modal_write note_modal_value_${nowNote.color}`}
                modules={modules}
                style={{ border: "1px solid black" }}
                onChange={valueChange}
            />
        </div>
      );
}
