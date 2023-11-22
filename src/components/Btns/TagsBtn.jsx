import React from 'react'
import { Link } from 'react-router-dom'

function TagsBtn({className='', title}) {
  return (
    <>
    {
        title &&
        <div>
            <Link to={`/post/tags/${title}`} className={`py-2.5 px-2 lowercase font-medium text-xs bg-gray-300 hover:bg-gray-400 transition-colors duration-200 ease-in-out rounded-md text-black ${className}`}>{title}</Link>
        </div>
    }
    </>
  )
}

export default TagsBtn