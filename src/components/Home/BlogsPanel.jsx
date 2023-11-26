import { useState, useEffect } from "react"

import { postService } from "../../service/index"

import InfiniteScroll from 'react-infinite-scroll-component'
import {
  FlexContainer,
  HorizontalCard,
  HorizontalCardSkeleton,
  Spinner,
} from "../index"
import { useToast } from '@/components/ui/use-toast'

import { TrendingUp } from 'lucide-react'

function BlogsPanel() {
    const {toast} = useToast()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1) //holds the page number
    const [hasMore, setHasMore] = useState(true) //holds bool value of whether more data is available or not

    useEffect(() => {
      setLoading(true)
      setPage(1)
      setHasMore(true)
      setData([])
      fetchData().finally(()=>setLoading(false))
    }, [])  

    const fetchData = async () => {
      try {
          const response = await postService.getPosts(page);
          if(response.status == 200){
              setData((prevComment)=>[...prevComment, ...response.results])
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
      <div>
        <div className="pl-24 flex items-center">
          <TrendingUp className="inline-block mr-2 text-muted-foreground" />
          <p className="font-bold text-2xl text-muted-foreground">Top Stories</p>
        </div>
        <FlexContainer className="flex-col justify-start pt-0">
          {
            loading ? 
            <>
              <HorizontalCardSkeleton className="w-full"/>
              <HorizontalCardSkeleton className="w-full"/>
              <HorizontalCardSkeleton className="w-full"/>
            </> :
            data.length > 0 &&
            <InfiniteScroll 
            dataLength={data.length}
            scrollableTarget="sheet-content"
            next={fetchData}
            hasMore={hasMore}
            loader={<Spinner/>}>
              <div className='overflow-y-hidden'>
                {
                data.map((item) => (
                  <HorizontalCard
                    key={item.uuid}
                    className="w-full"
                    postUUID={item.uuid}
                    postImg={item.header_img}
                    sliceTitle={false}
                    title={item.title}
                    authorUUID = {item.user?.uuid}
                    authorImg={item.user?.profile_pic}
                    author={`${item.user?.first_name} ${item.user?.last_name}`}
                    commentCount={item.comments_no}
                    likeCount={item.likes_no}
                    tag={item.tags_parsed[0]}
                    />
                ))
                }
              </div>
            </InfiniteScroll>
          }
        </FlexContainer>
      </div>
    )
}

export default BlogsPanel