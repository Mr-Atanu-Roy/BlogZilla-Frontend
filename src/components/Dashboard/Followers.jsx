import { useState, useEffect } from "react"
import { userService } from "../../service/index"

import { FlexContainer, AuthorCardContainer, AuthorCardContainerSkeleton, Spinner } from "../index"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useToast } from "@/components/ui/use-toast"

function Followers() {

    const { toast } = useToast()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
  
    useEffect(() => {
      setLoading(true)
      setPage(1)
      setHasMore(false)
      setData([])
      fetchData().finally(()=>setLoading(false))
    }, [])

    const fetchData = async () => {
        try {
          const response = await userService.getFollowers(page);
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
          console.log(error)
          toast({ variant: "destructive", title: 'Something went wrong.',})
        }
    }

    return (
        <FlexContainer className="flex-col py-0">
            {
            loading ?
            <>
            <AuthorCardContainerSkeleton className="w-full" />
            <AuthorCardContainerSkeleton className="w-full" />
            <AuthorCardContainerSkeleton className="w-full" />
            <AuthorCardContainerSkeleton className="w-full" />
            <AuthorCardContainerSkeleton className="w-full" />
            <AuthorCardContainerSkeleton className="w-full" />
            </>:
            <>
            {
                data.length > 0 ?
                <InfiniteScroll 
                dataLength={data.length}
                scrollableTarget="sheet-content"
                next={fetchData}
                hasMore={hasMore}
                loader={<Spinner/>}>
                    {
                    data.map((item) => (
                    <AuthorCardContainer
                    key={item.uuid}
                    className="w-full"
                    author={item.first_name + ' ' + item.last_name}
                    authorUUID={item.uuid}
                    authorImg={item.profile_pic}
                    bio={item.user_profile?.bio}
                    country={item.country}
                    blogsPublished={item.blogs_published_no}
                    />
                    ))
                    }
                </InfiniteScroll> :
                <p className="text-muted-foreground font-medium text-sm">No followers to show....</p>
            }
            </>
            }
        </FlexContainer>
    )
}

export default Followers