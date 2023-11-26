import { useState, useEffect } from "react"

import { peopleService } from '../../service/index'

import { AuthorCardContainer, AuthorCardContainerSkeleton } from "../index"
import { useToast } from '@/components/ui/use-toast'

function TopAuthors() {
    const {toast} = useToast()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        ;(
          async ()=>{
            setLoading(true)
            try {
                const response = await peopleService.getPeople();
                if(response.status == 200){
                    setData(response.results.slice(0, 6))
                }else{
                    toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
                }
            } catch (error) {
                toast({ variant: "destructive", title: 'Something went wrong.',})
            }finally{
              setLoading(false)
            }
  
          }
  
        )()
  
      }, [])  

  return (
    <div className="grid grid-cols-3 gap-12 px-16 my-6">
        <div className="">
            {
                loading ? 
                <>
                    <AuthorCardContainerSkeleton className="w-full" />
                    <AuthorCardContainerSkeleton className="w-full" />
                </>:
                data.slice(0,2).map((author, index)=>(
                    <AuthorCardContainer key={index}
                    className="w-full"
                    author={author.first_name + " " + author.last_name}
                    authorUUID={author.uuid}
                    authorImg={author.profile_pic}
                    bio={author.user_profile?.bio}
                    country={author.country}
                    blogsPublished={author.blogs_published}
                    />
                ))
            }
        </div>
        <div className="">
            {
                loading ?
                <>
                    <AuthorCardContainerSkeleton className="w-full" />
                    <AuthorCardContainerSkeleton className="w-full" />
                </>:
                data.slice(2,4).map((author, index)=>(
                    <AuthorCardContainer key={index}
                    className="w-full"
                    author={author.first_name + " " + author.last_name}
                    authorUUID={author.uuid}
                    authorImg={author.profile_pic}
                    bio={author.user_profile?.bio}
                    country={author.country}
                    blogsPublished={author.blogs_published}
                    />
                ))
            }
        </div>
        <div className="">
            {
                loading ?
                <>
                    <AuthorCardContainerSkeleton className="w-full" />
                    <AuthorCardContainerSkeleton className="w-full" />
                </>:
                data.slice(4,6).map((author, index)=>(
                    <AuthorCardContainer key={index}
                    className="w-full"
                    author={author.first_name + " " + author.last_name}
                    authorUUID={author.uuid}
                    authorImg={author.profile_pic}
                    bio={author.user_profile?.bio}
                    country={author.country}
                    blogsPublished={author.blogs_published}
                    />
                ))
            }
            
        </div>
    </div>
  )
}

export default TopAuthors