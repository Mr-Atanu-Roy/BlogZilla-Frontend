import { useState, useEffect } from "react"

import { postService } from "../../service/index"

import { HorizontalCard, HorizontalCardSkeleton, Spinner } from "../index"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useToast } from "@/components/ui/use-toast"

function Blogs({authorUUID}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setLoading(true)
    setPage(1)
    setHasMore(false)
    setData([])
    fetchBlogs().finally(()=>setLoading(false))
  }, [authorUUID])

  const fetchBlogs = async () => {
      try {
        const response = await postService.getPosts(page, '', authorUUID);
        if(response.status == 200){
            setData((prev)=>[...prev, ...response.results])
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
    loading ?
    <>
      <HorizontalCardSkeleton className="w-full" />
      <HorizontalCardSkeleton className="w-full" />
      <HorizontalCardSkeleton className="w-full" />
      <HorizontalCardSkeleton className="w-full" />
      <HorizontalCardSkeleton className="w-full" />
      <HorizontalCardSkeleton className="w-full" />
    </>:
    <>
      {
        data.length > 0 ?
        <InfiniteScroll 
        dataLength={data.length}
        scrollableTarget="sheet-content"
        next={fetchBlogs}
        hasMore={hasMore}
        loader={<Spinner/>}>
          <div className='overflow-y-hidden'>
            {
            data.map((item) => (
              <HorizontalCard
                key={item.uuid}
                className="w-full"
                showAuthor={false}
                postUUID={item.uuid}
                postImg={item.header_img}
                sliceTitle={false}
                title={item.title}
                commentCount={item.comments_no}
                likeCount={item.likes_no}
                tag={item.tags_parsed[0]}
                />
            ))
            }
          </div>
        </InfiniteScroll> :
        <p className="text-muted-foreground font-medium text-sm">No posts published yet....</p>
      }
    </>
  )
}

export default Blogs