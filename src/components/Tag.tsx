import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTag } from '../reducers/tagSlice';
import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import './Tag.css'
export default function Tag() {
    const tags = useAppSelector(selectTag);
    console.log(tags);
    useEffect(() => {},[tags]);
    
  return (
    <div className='tag_container'>
        {tags.map((tag) => {
            return <Link key={tag.id} to={`/tag/${tag.value}`} className='nav_btn tag_btn'>{tag.value}</Link>
        })}
    </div>
  )
}
