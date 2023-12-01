import { useState, useEffect } from 'react'

import { postService } from '../../service/index'

import { useToast } from '@/components/ui/use-toast'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
    SectionContainer,
    FlexContainer,
    VerticalCard,
    VerticalCardSkeleton,
    NothingFound,
    Spinner,
} from '../index'

function PopularBlog() {

    const {toast} = useToast()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setLoading(true);
        setPage(1)
        setHasMore(true)
        setPosts([])
        fetchData().finally(()=>setLoading(false))   
    }, []);

    const fetchData = async () => {
        try {
            const response = await postService.getPosts(page, '', '', '', true, '', true);
            console.log(response)
            if(response.status == 200){
                setPosts((prevData)=>[...prevData, ...response.results])
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
        <SectionContainer
        title="Popular Posts"
        description={`Read the most popular posts published by authors`}>
            
        
        {
            loading ? 
            <FlexContainer>
                <VerticalCardSkeleton/>
                <VerticalCardSkeleton/>
                <VerticalCardSkeleton/>
            </FlexContainer> :
            posts.length>0 ?
            <InfiniteScroll 
            dataLength={posts.length}
            scrollableTarget="sheet-content"
            next={fetchData}
            hasMore={hasMore}
            loader={<Spinner/>}>
                <div className="overflow-y-hidden">
                <FlexContainer>
                {
                    posts.map((item) => (
                        <VerticalCard key={item.uuid}
                        headerImg={item.header_img}
                        authorImg={item.user.profile_pic}
                        title={item.title}
                        postUUID={item.uuid}
                        author={`${item.user.first_name} ${item.user.last_name}`}
                        authorUUID = {item.user.uuid}
                        tag={item.tags_parsed[0]}
                        likeCount={item.likes_no}
                        commentCount={item.comments_no}
                        date={item.created_at}
                        />
                    ))
                }
                </FlexContainer>
                </div>
            </InfiniteScroll> :
            <NothingFound
                description="Sorry no posts were found."
                buttonText="Go Home"
                buttonLink="/"
            />
        }
        
        </SectionContainer>
    )
}

export default PopularBlog