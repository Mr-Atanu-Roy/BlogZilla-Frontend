import React from 'react'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import { 
  EditPostBtn,
  FollowBtn,
  AddBookMark,
  RemoveBookMark,
  ShareBtn,
  Comments,
  Likes 
} from '../../index'
import { UserCircle, MapPin} from 'lucide-react'

import handelDate from '../../../utils/handelDate'

function ContentHead({
    blogUUID,
    title, headerImg,
    authorImg, author, authorUUID, authorCountry,
    likes = 0, comments = 0,
    date

  }) {
    if(date){
      const getDate = handelDate(date)
      date = `${getDate.day}.${getDate.month}.${getDate.year}`
    }

    const user = useSelector((state) => state.auth)
    const userUUID = user?.status ? user?.userData?.uuid : null

    const location = `http://localhost:5173${useLocation().pathname}`

    return (
      <div>
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <div className='flex items-center justify-between my-11'>
            <div className='flex items-center justify-start'>
              <Link to={`/author/${authorUUID}`}>
                {
                    authorImg ? 
                    <img src={`${authorImg}`} alt={author} className={`rounded-full w-14 h-14 object-center object-cover`} /> :
                    <UserCircle className="w-14 h-14" />
                }
              </Link>
              <div className='flex flex-col ml-1.5'>
                  {
                    authorCountry &&
                    <Link to={`/author/${authorCountry}`} className="flex items-center">
                        <MapPin className='w-4 h-5 ml-1'/>
                        <span className='text-sm'>{authorCountry}</span>
                    </Link>
                  }
                  <Link to={`/author/${authorUUID}`} className="font-medium ml-2">{author}</Link>
              </div>
            </div>
            {
            userUUID != authorUUID &&
            <div>
                <FollowBtn authorUUID={authorUUID} />
            </div>
            }
        </div>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center justify-start'>
            <Comments className='mr-3.5' comments={comments} blogUUID={blogUUID}/>
            <Likes likes={likes} blogUUID={blogUUID}/>
          </div>
          <div className='flex items-center'>
            <ShareBtn title={title} url={location}/>
            <AddBookMark className='ml-2' blogUUID={blogUUID}/>
            {
              userUUID == authorUUID &&
              <EditPostBtn postUUID={blogUUID}/>
            }
          </div>
        </div>
        <div className='w-full my-10'>
          <img src={headerImg} alt={title} className='w-full'/>
        </div>
      </div>
    )
}

export default ContentHead