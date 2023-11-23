import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { postService } from '../../../service/index'
import handelDate from '../../../utils/handelDate'

import InfiniteScroll from 'react-infinite-scroll-component'

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
import { Spiner } from '../../index'

  
import { MessageCircle, UserCircle, ThumbsUp } from 'lucide-react'


function Comments({className, width="7", height="7", blogUUID}) {
    
    const {toast} = useToast()
    const [loading, setLoading] = useState(false) //holds the loading state
    const [comment, setComment] = useState([]) //holds the comments data
    const [comments, setComments] = useState(0) //holds the total number of comments
    const [page, setPage] = useState(1) //holds the page number
    const [hasMore, setHasMore] = useState(true) //holds bool value of whether more data is available or not


    
    useEffect(() => {

        (async () => {
            setLoading(true);
            setPage(1);
            setComment([]);
            
            try {
                if(blogUUID){
                    const response = await postService.getComments(blogUUID);
                    console.log(response)
                    if(response.status == 200){
                        setComment(response.results)
                        setComments(response.count)
                        if(response.next != null){
                            setPage((prevPage)=>prevPage+1)
                        }else{
                            setHasMore(false)
                        }
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
    

    const fetchNext = async () => {
        try {
            const response = await postService.getComments(blogUUID, page);
            if(response.status == 200){
                setComment((prevComment)=>[...prevComment, ...response.results])
                if(response.next != null){
                    setPage((prevPage)=>prevPage+1)
                }else{
                    setHasMore(false)
                }
            }else{
                toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
            }
        } catch (error) {
          toast({ variant: "destructive", title: 'Something went wrong.',})
        }
    }



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
        <SheetContent id='sheet-content' className="overflow-y-auto">
            <SheetHeader>
            <SheetTitle>{comments} {comments>1 ? "Comments" : "Comment"} till now</SheetTitle>
            <SheetDescription>
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
                        (
                        comment.length>0 && 
                        <InfiniteScroll 
                        dataLength={comment.length}
                        scrollableTarget="sheet-content"
                        next={fetchNext}
                        hasMore={hasMore}
                        loader={<Spiner/>}>
                        <div className='overflow-y-hidden'>
                        {
                            comment.map((item, index) => (
                            <div key={index} className="space-y-3 mb-8 pb-2.5 border-b">
                                <div className='overflow-hidden flex items-start space-x-4 '>
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
                                        <p className="text-xs text-primary">View more</p>     
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full px-2 pt-1.5">
                                    <div className='flex items-center'>
                                        {
                                            item.comments_no > 0 && 
                                            <Button variant="link" className="pl-0">
                                                Replies ({item.comments_no})
                                            </Button>
                                        }
                                        {
                                            item.likes_no > 0 && 
                                            <Button variant="link" className="pl-0">
                                                Likes ({item.likes_no})
                                            </Button>
                                        }
                                    </div>
                                    <div className='flex items-center'>
                                        <ThumbsUp className='w-5 h-5 mr-3'/>
                                        <MessageCircle className='w-5 h-5'/>
                                    </div>
                                </div>                           
                            </div>
                            ))
                        }
                        </div>
                        </InfiniteScroll>
                        )
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