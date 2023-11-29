import { cn } from "@/lib/utils"

import { Link } from 'react-router-dom'

function TagsBtn({className='', title}) {
  
  let px="px-2";
  if(title && title.length < 7) px="px-3"
  if(title && title.length < 4) px="px-3.5"

  return (
    <>
    {
        title &&
        <Link to={`/post/tags/${title}`} className={cn(`py-2.5 m-1 ${px} lowercase font-medium text-xs bg-muted hover:bg-gray-200 transition-colors duration-200 ease-in-out rounded-md text-black `, className)}>{title}</Link>
    }
    </>
  )
}

export default TagsBtn