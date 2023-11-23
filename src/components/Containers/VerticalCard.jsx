import React from 'react'

import { TagsBtn } from '../index'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { MessageCircle, ThumbsUp, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

import handelDate from '../../utils/handelDate'

function VerticalCard({
    width = "320px",
    headerImgHeight = "52",
    headerImg,
    title, postUUID,
    authorImg, author, authorUUID,
    commentCount = 0, likeCount = 0,
    tag, date
    }) {

    if(date){
        const getDate = handelDate(date)
        date = `${getDate.day}.${getDate.month}.${getDate.year}`
    }

    if(tag) tag = tag.toLowerCase()

    if(title && title.length>60) title = title.slice(0,60)+"...."

    return (
        <Card className={`w-[${width}] h-[400px] m-10 p-0 border-none shadow-none flex flex-col justify-between`}>
            <CardHeader className="p-0">
            
                    <Link to={`/post/${postUUID}`}>
                        {
                            headerImg ? 
                            <img src={`${headerImg}`} alt={title} className={`rounded w-full h-${headerImgHeight} object-center object-cover aspect-video`} /> : 
                            <Skeleton className={`w-full h-${headerImgHeight}`}/>
                        }
                    </Link>
                
                <CardDescription className="pt-4 px-1 flex justify-between items-center">
                    <Link to={`/author/${authorUUID}`} className='flex items-center justify-start'>
                        {
                            authorImg ? 
                            <img src={`${authorImg}`} alt={author} className={`rounded-full w-9 h-9 object-center object-cover`} /> :
                            <UserCircle className="w-8 h-8" />
                        }
                        <span className="font-medium text-sm ml-2">{author}</span>
                    </Link>
                    {
                        tag &&
                        <TagsBtn title={tag}/>
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="px-1 mt-6">
                <Link to={`/post/${postUUID}`} className='text-xl font-medium'>{title}</Link>
            </CardContent>
            <CardFooter className="px-1 pb-0 flex items-end justify-between text-sm font-medium text-gray-500">
                <div className='flex'>
                    <div className='flex items-center'>
                        <MessageCircle className='w-5 h-5 mr-1' />
                        <p>{commentCount}</p>
                    </div>
                    <div className='flex items-center ml-4'>
                        <ThumbsUp className='w-5 h-5 mr-1' />
                        <p>{likeCount}</p>
                    </div>
                </div>
                {
                    date &&
                    <div>
                        <p>{date}</p>
                    </div>
                }
            </CardFooter>
        </Card>
    )
}

export default VerticalCard