import React, { useState } from 'react'
import "./Nav.css"
import { Link } from 'react-router-dom'
import Tag from './Tag'
import EditTagModal from './Modals/EditTagModal';

export default function Nav() {
  const [ editTagModalOpen, setEditTagModalOpen ] = useState(false);
  const onClickEditTag = () => {
    setEditTagModalOpen(true);
  }
  return (
    <nav className='nav_container'>
        {editTagModalOpen && <EditTagModal setEditTagModalOpen={setEditTagModalOpen}/>}
        <h1 className='nav_title'>메모장</h1>
        <Link to='/' className='nav_btn nav_notes_btn'>Notes</Link>
        <Tag/>
        <div className='nav_btn nav_editTags_btn' onClick={onClickEditTag}>Edit Tags</div>
        {/* <Link to='/archive' className='nav_btn nav_archive_btn'>Archive</Link> */}
        <Link to='/trash' className='nav_btn nav_trash_btn'>Trash</Link>
    </nav>
  )
}
