import React from 'react'

import { TagsBtn } from '../index'
import { Skeleton } from "@/components/ui/skeleton"

import { MessageCircle, ThumbsUp, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'


function HorizontalCard({  
    width = "850px",
    postImgWidth = "300px",
    postImg,
    title, postUUID,
    authorImg, author, authorUUID,
    commentCount = 0, likeCount = 0,
    tag
  }) {
    return (
      <div className={`w-[${width}] m-5 p-0 flex items-center justify-between`}>
        <div className='flex flex-col items-start justify-between mr-10 w-full'>
            <Link to={`/author/${authorUUID}`} className='flex items-center justify-start'>
                {
                  authorImg ? 
                  <img src={authorImg} className={`rounded-full w-9 h-9 object-center object-cover`} /> :
                  <UserCircle className="w-8 h-8" />
                }
                <span className="font-medium text-sm ml-2">{author}</span>
            </Link>
            <div className="mt-7">
                <Link to={`/post/${postUUID}`} className='text-xl font-medium break-words'>{title}</Link>
            </div>
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
                  tag &&
                  <TagsBtn title={tag}/>
                }
            </div>
        </div>
          <div className={`inline-block w-[${postImgWidth}] h-44`}>
            <Link to={`/post/${postUUID}`} className={`inline-block w-[${postImgWidth}] h-44`}>
              {
                postImg ?
                <img src={postImg} alt={title} className={`w-[${postImgWidth}] h-44 object-center object-cover`} /> :
                <Skeleton className={`w-[${postImgWidth}] h-44`}/>
              }
            </Link> 
          </div>
      </div>

  )
}

export default HorizontalCard