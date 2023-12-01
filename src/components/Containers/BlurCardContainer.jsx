import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom'

import { FollowBtn, TagsBtn } from '../index'

import { MoveRight, UserCircle, ThumbsUp, MessageCircle } from 'lucide-react'

import handelDate from '@/utils/handelDate'


function BlurCardContainer({
    className='',
    authorImg, author, authorUUID,
    title, description,
    postUUID, date,
    commentCount = 0, likeCount = 0,
    tag = []
    }) {

    if(date){
        const getDate = handelDate(date)
        date = `${getDate.day}.${getDate.month}.${getDate.year}`
    }
    if(tag.length > 4) tag.slice(0, 4)

    if(title && title.length > 75) title = title.slice(0, 70) + '.....'
    
    return (
        
        <div className={cn('w-[510px] h-[385px] bg-none backdrop-blur-md rounded-lg p-6 shadow-md ', className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start" data-swiper-parallax="-300">
                    {
                        authorImg ?
                        <img src={authorImg} alt="" className='w-12 h-12 rounded-full object-center object-cover mr-3' /> : 
                        <UserCircle className="w-12 h-12 mr-3" />
                    }
                    <div>
                        <Link to={`/author/${authorUUID}`} className='block text-xl font-bold'>{author}</Link>
                        <p className="text-sm">{date}</p>
                    </div>
                </div>
                <FollowBtn authorUUID={authorUUID} />
            </div>
            <div className="w-full flex items-center justify-end mt-7 mb-3.5">
                {
                    tag.map((tag, index) => (
                        <TagsBtn className='ml-2' title={tag} key={index} />
                    ))
                }                
            </div>
            <div className="text-2xl font-medium mb-3.5" data-swiper-parallax="-200">
                <Link to={`/post/${postUUID}`}>
                    {title}
                </Link>
            </div>
            <div data-swiper-parallax="-100">
                <p className='text-base'>
                    {description}
                </p>
                <div className="flex items-end justify-between mt-5">
                    <Link to={`/post/${postUUID}`} className='max-w-fit text-sm font-medium flex items-center justify-center rounded-full px-3 border py-1'>
                        Continue Reading <MoveRight className='ml-1 mt-0.5' />
                    </Link>
                    <div className='flex'>
                        <div className='flex items-center mr-3'>
                            <p className='text-xl mr-1'>{commentCount}</p>
                            <MessageCircle className='w-5 h-5' />
                        </div>
                        <div className='flex items-center'>
                            <p className='text-xl mr-1'>{likeCount}</p>
                            <ThumbsUp className='w-5 h-5' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlurCardContainer