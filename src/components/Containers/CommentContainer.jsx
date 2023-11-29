import { useState } from "react"
import { useSelector } from "react-redux"

import { Link } from "react-router-dom"

import { UserCircle, MoreHorizontal, ThumbsUp, MessageCircle } from "lucide-react"
import handelDate from "../../utils/handelDate"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"


function CommentContainer({
    authorName, authorImg, authorUUID,
    comment, commentUUID,
    commentLikes, commentReplies,
    date

    }) {
    
    if(date) date=handelDate(date).day+"."+handelDate(date).month+"."+handelDate(date).year

    const user = useSelector((state) => state.auth)
    const userUUID = user?.status ? user?.userData?.uuid : null

    const [showFullText, setShowFullText] = useState(false);

    const truncatedText = showFullText ? comment : comment.length > 120 ? comment.slice(0, 115) + "..." : comment;

    return (
        <div className="space-y-3 mb-8 pb-2.5 border-b">
            <div className='overflow-hidden flex items-start space-x-4 '>
                <Link to={`/author/${authorUUID}`}>
                {
                    authorImg ?
                    <img src={authorImg} alt={authorName} className='rounded-full w-10 h-9 object-center object-cover aspect-square' /> : 
                    <UserCircle className='w-9 h-9' />
                }
                </Link>
                <div className="w-full">
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <Link to={`/author/${authorUUID}`} className="font-medium text-base text-black">{authorName}</Link>
                            {date && <p className="text-xs mt-0.5 text-gray-400">{date}</p>}
                        </div>
                        {
                            authorUUID == userUUID &&
                            <Popover>
                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                <PopoverContent className="flex flex-col w-28 mr-9">
                                    <span className="text-sm mb-2 cursor-pointer hover:text-primary duration-200 transition-colors capitalize font-medium">Edit</span>
                                    <span className="text-sm cursor-pointer hover:text-primary duration-200 transition-colors capitalize font-medium">Delete</span>
                                </PopoverContent>
                            </Popover>
                        }
                    </div>
                    <p className="text-sm mt-3 mb-1.5">
                        {truncatedText} 
                    </p>
                    {comment.length > 120  && 
                        <p className="text-xs text-primary cursor-pointer hover:underline" onClick={() => setShowFullText(!showFullText)}>
                            {showFullText ? "View less" : "View more"}
                        </p>    
                    }
                </div>
            </div>
            <div className="flex items-center justify-between w-full px-2 pt-1.5">
                <div className='flex items-center'>
                    {
                        commentReplies > 0 && 
                        <Button variant="link" className="pl-0">
                            Replies ({commentReplies})
                        </Button>
                    }
                    {
                        commentLikes > 0 && 
                        <Button variant="link" className="pl-0">
                            Likes ({commentLikes})
                        </Button>
                    }
                </div>
                <div className='flex items-center'>
                    <ThumbsUp className='w-5 h-5 mr-3'/>
                    <MessageCircle className='w-5 h-5'/>
                </div>
            </div>                           
        </div>
    )
}

export default CommentContainer