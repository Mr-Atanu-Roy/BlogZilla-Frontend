import { useState, useEffect } from 'react'

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'

  
import { MessageCircle, UserCircle } from 'lucide-react'


function Comments({className, width="7", height="7", blogUUID}) {
    
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState([])
    const [comments, setComments] = useState(0)
    const [next, setNext] = useState(null)
    const [previous, setPrevious] = useState(null)

    useEffect(() => {

        (async () => {

            setLoading(true);
            
            try {
                if(blogUUID){
                    const response = await postService.getComments(blogUUID);
                    if(response.status == 200){
                        setComment(response.results)
                        setComments(response.count)
                    }else{
                        toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
                    }
                }
              

            } catch (error) {
              toast({ variant: "destructive", title: 'Something went wrong.',})
            }finally{
              setLoading(false);
            }
      
          })();

    }, [blogUUID]);

  return (
    <Sheet>
        <SheetTrigger className={`${className}`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className='flex items-center' asChild>
                        <div>
                            <MessageCircle className={`mr-1 w-${width} h-${height}`} />
                            <span>{comments}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View Comments</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
            <SheetTitle>{comments} {comments>1 ? "Comments" : "Comment"} till now</SheetTitle>
            <SheetDescription className="overflow-y-auto">
                <>
                <form disabled={loading} className="mt-6 px-3">
                    <Input type="text" placeholder="Comment your thoughts..." className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={loading} />
                    <Button type="submit" className={`mt-3 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}  disabled={loading}>Comment</Button>
                </form>
                <div className='mt-10'>
                    {
                        loading ?
                        <>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 mb-6">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[250px]" />
                            </div>
                        </div>
                        </> :
                        <>
                        <>
                        {
                            comment.length>0 &&
                            comment.map((item) => (
                            <div key={item.uuid} className="flex items-start space-x-4 mb-6 pb-2.5 border-b">
                                {
                                    item.user?.profile_pic ?
                                    <img src={item.user.profile_pic} alt={item.user?.first_name+" "+item.user?.last_name} className='rounded-full w-9 h-9 object-center object-cover aspect-square' /> : 
                                    <UserCircle className='w-9 h-9' />
                                }
                                <div className="space-y-2 w-full">
                                    <div className="w-full flex items-center justify-between">
                                        <Link to="/author/" className="font-medium text-base text-black">{item.user?.first_name+" "+item.user?.last_name}</Link>
                                        <p className="text-xs text-gray-400">{handelDate(item.created_at).day+"."+handelDate(item.created_at).month+"."+handelDate(item.created_at).year}</p>
                                    </div>
                                    <p className="text-sm">
                                        {item.comment} 
                                    </p>                                
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

export default Comments