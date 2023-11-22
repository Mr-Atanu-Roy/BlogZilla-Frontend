import {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'
import { postService } from '../../../service/index'
import handelDate from '../../../utils/handelDate'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { FollowBtn } from '../../index'
import { useToast } from '@/components/ui/use-toast'

  
import { ThumbsUp } from 'lucide-react'
import { set } from 'react-hook-form'

function Likes({className, width="7", height="7"}) {
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState(0)
    const [like, setLike] = useState([])
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)

  return (
    <Sheet>
        <SheetTrigger className={`${className}`}>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger className='flex items-center' asChild>
                    <div>
                        <ThumbsUp className={`mr-1 w-${width} h-${height}`} />
                        <span>{likes}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View Likes</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>{likes} {likes>2 ? "Likes" : "Like"} till now</SheetTitle>
            <SheetDescription>
                <>
                <div className='w-full flex items-end justify-between px-3 mt-6'>
                    <Label className="font-medium text-xl">Like this</Label>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='cursor-pointer' asChild>
                                <ThumbsUp width={35} height={35}  fill='red' color='red'/>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Click to like this</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className='mt-14'>
                    {
                        loading ?
                        <>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[125px]" />
                                <Skeleton className="h-9 w-[4.77rem]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[125px]" />
                                <Skeleton className="h-9 w-[4.77rem]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[125px]" />
                                <Skeleton className="h-9 w-[4.77rem]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[125px]" />
                                <Skeleton className="h-9 w-[4.77rem]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[125px]" />
                                <Skeleton className="h-9 w-[4.77rem]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[125px]" />
                                <Skeleton className="h-9 w-[4.77rem]" />
                            </div>
                        </div>
                        </> :
                        <>
                        <>
                        {
                            like.length>0 &&
                            like.map((item) => (
                            <div className="flex items-start space-x-4 mb-6 pb-2.5">
                                <img src="http://localhost:8000/media/blog_header_img/6454562_eRLL2jN.jpg" alt="" className='rounded-full w-9 h-9 object-center object-cover aspect-square' />
                                <div className="space-y-2 w-full">
                                    <div className='w-full flex items-center justify-between'>
                                        <Link to="/author/" className="font-medium text-base text-black">Atanu Roy</Link>
                                        <p className="text-xs text-gray-400">{handelDate(item.created_at).day+"."+handelDate(item.created_at).month+"."+handelDate(item.created_at).year}</p>
                                    </div>
                                    <FollowBtn className="rounded-full" authorUUID={""} />
                                </div>
                            </div>
                            ))
                        }
                        </>
                        {
                            next &&
                            <div className="w-full text-right">
                                <Button variant="ghost" className="text-xs">View More</Button>
                            </div>
                        }
                        </>
                    }
                </div>
                </>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
  )
}

export default Likes