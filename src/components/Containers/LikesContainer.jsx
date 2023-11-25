import { Link } from 'react-router-dom'

import { FollowBtn } from '../index'

import { UserCircle } from 'lucide-react'

import handelDate from '@/utils/handelDate'

function LikesContainer({
    authorName, authorImg, authorUUID,
    date
    }) {

    if(date) date=handelDate(date).day+"."+handelDate(date).month+"."+handelDate(date).year

    return (
        <div className="flex items-start space-x-4 mb-6 pb-2.5">
            <Link to={`/author/${authorUUID}`}>
            {
                authorImg ?
                <img src={authorImg} alt={authorName} className='rounded-full w-10 h-9 object-center object-cover aspect-square' /> : 
                <UserCircle className='w-9 h-9' />
            }
            </Link>
            <div className="w-full">
                <div className='w-full flex items-start justify-between'>
                    <Link to={`/author/${authorUUID}`} className="font-medium text-base text-black">{authorName}</Link>
                    <FollowBtn className="rounded-full" authorUUID={authorUUID} />
                </div>
                <p className="text-xs text-gray-400 relative -top-2">{date}</p>
            </div>
        </div>
    )
}

export default LikesContainer