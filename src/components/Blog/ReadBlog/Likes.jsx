import {useState, useEffect} from 'react'

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
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Spinner, LikesContainer, LikesContainerSkeleton } from '../../index'
  
import { ThumbsUp } from 'lucide-react'

function Likes({className, width="7", height="7", blogUUID}) {
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)
    const [like, setLike] = useState([]) 
    const [likes, setLikes] = useState(0)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {

        setLoading(true)
        setPage(1)
        setHasMore(true)
        setLike([])
        fetchData().finally(()=>setLoading(false))

    }, [blogUUID]);

    
    const fetchData = async () => {
        try {
            if(!blogUUID) return;
            const response = await postService.getPostLikes(blogUUID, page);
            if(response.status == 200){
                setLike((prevComment)=>[...prevComment, ...response.results])
                setLikes(response.count)
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
        <SheetContent id='sheet-content' className="overflow-y-auto">
            <SheetHeader>
            <SheetTitle>{likes} {likes>1 ? "Likes" : "Like"} till now</SheetTitle>
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
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        <LikesContainerSkeleton/>  
                        </> :
                        (
                        like.length>0 &&
                        <InfiniteScroll 
                        dataLength={like.length}
                        scrollableTarget="sheet-content"
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<Spinner/>}>
                        <div className='overflow-y-hidden'>
                        {
                            like.map((item) => (
                            <LikesContainer key={item.uuid} 
                                authorUUID={item.user?.uuid}
                                authorName={item.user?.first_name+" "+item.user?.last_name}
                                authorImg={item.user?.profile_photo}
                                date={item.created_at}
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

export default Likes