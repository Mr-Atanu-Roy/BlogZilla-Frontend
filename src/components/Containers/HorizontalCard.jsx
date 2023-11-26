import React from 'react'

import { TagsBtn } from '../index'
import { Skeleton } from "@/components/ui/skeleton"

import { MessageCircle, ThumbsUp, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from "@/lib/utils"

function HorizontalCard({  
    className = "",
    postImg,
    title, postUUID,
    authorImg, author, authorUUID,
    commentCount = 0, likeCount = 0,
    tag, rating=true, sliceTitle=true, showAuthor=true 
  }) {

    let cardHeight = "h-52", componentHeight = "h-40";
    if(!rating){
      cardHeight = "h-40"
      componentHeight = "h-32" 
    }

    if(sliceTitle && title.length > 100) title = title.slice(0, 92) + "....."
    if(tag) tag = tag.toLowerCase()

    return (
      <div className={cn(`w-[530px] ${cardHeight} mb-4 py-5 flex items-center justify-between border-b-2 `, className)}>
        <div className={`flex flex-col items-start justify-between mr-2 ${componentHeight} w-[70%]`}>
            {
              showAuthor &&
              <Link to={`/author/${authorUUID}`} className='flex items-center justify-start'>
                  {
                    authorImg ? 
                    <img src={authorImg} className={`rounded-full w-9 h-9 object-center object-cover`} /> :
                    <UserCircle className="w-8 h-8" />
                  }
                  <span className="font-medium text-sm ml-2">{author}</span>
              </Link>
            }
            <div className="mt-3">
                <Link to={`/post/${postUUID}`} className={`${showAuthor ? "text-lg" : "text-xl"} text-black font-medium break-words`}>{title}</Link>
            </div>
            {
              rating &&
              <div className="mt-4 w-full flex items-end justify-between">
                  <div className='flex'>
                    <div className='flex items-center'>
                        <MessageCircle className='w-5 h-5 mr-1' />
                        <p>{commentCount}</p>
                    </div>
                    <div className='flex items-center ml-5'>
                        <ThumbsUp className='w-5 h-5 mr-1' />
                        <p>{likeCount}</p>
                    </div>
                  </div>
                  {
                    tag ?
                    <TagsBtn title={tag}/> :
                    <div className='w-3 h-3'> </div>
                  }
              </div>
            }
        </div>
        <div className={`w-[26%] ${componentHeight}`}>
          <Link to={`/post/${postUUID}`} className={`flex items-center justify-center w-full ${componentHeight}`}>
            {
              postImg ?
              <img src={postImg} alt={title} className={`w-full h-28 object-center object-cover`} /> :
              <Skeleton className={`w-full h-28`}/>
            }
          </Link> 
        </div>
      </div>

  )
}

export default HorizontalCard