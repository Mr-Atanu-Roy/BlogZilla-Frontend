import { useState, useEffect } from 'react'

import { postService } from '../../../service/index'

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

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'
import { Spinner, CommentContainer, CommentContainerSkeleton } from '../../index'

  
import { MessageCircle } from 'lucide-react'


function Comments({className, width="7", height="7", blogUUID}) {
    
    const {toast} = useToast()
    const [loading, setLoading] = useState(false) //holds the loading state
    const [comment, setComment] = useState([]) //holds the comments data
    const [comments, setComments] = useState(0) //holds the total number of comments
    const [page, setPage] = useState(1) //holds the page number
    const [hasMore, setHasMore] = useState(true) //holds bool value of whether more data is available or not

    
    useEffect(() => {
        setLoading(true)
        setPage(1)
        setHasMore(true)
        setComment([])
        fetchData().finally(()=>setLoading(false))
    }, [blogUUID]);
    

    const fetchData = async () => {
        try {
            if(!blogUUID) return;
            const response = await postService.getPostComments(blogUUID, page);
            if(response.status == 200){
                setComments(response.count)
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
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        <CommentContainerSkeleton />
                        </> :
                        (
                        comment.length>0 && 
                        <InfiniteScroll 
                        dataLength={comment.length}
                        scrollableTarget="sheet-content"
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<Spinner/>}>
                        <div className='overflow-y-hidden'>
                        {
                            comment.map((item) => (
                            <CommentContainer key={item.uuid}
                                authorUUID={item.user?.uuid}
                                authorName={item.user?.first_name+" "+item.user?.last_name}
                                authorImg={item.user?.profile_pic}
                                commentUUID={item.uuid}
                                comment={item.comment}
                                date={item.created_at}
                                commentReplies={item.comments_no}
                                commentLikes={item.likes_no}
                            />
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