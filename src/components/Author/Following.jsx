import { useState, useEffect } from "react"

import { peopleService } from "../../service/index"

import { AuthorCardContainer, AuthorCardContainerSkeleton, Spinner } from "../index"
import InfiniteScroll from 'react-infinite-scroll-component'
import { useToast } from "@/components/ui/use-toast"

function Following({authorUUID}) {
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
        const response = await peopleService.following(authorUUID, page);
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
          next={fetchBlogs}
          hasMore={hasMore}
          loader={<Spinner/>}>
            <div className='overflow-y-hidden'>
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
            </div>
          </InfiniteScroll> :
          <p className="text-muted-foreground font-medium text-sm">No followings to show....</p>
        }
    </>
  )
}

export default Following