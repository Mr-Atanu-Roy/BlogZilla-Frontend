import React, { useEffect, useState } from 'react'

import { postService } from '../../service/index'
import { useToast } from '@/components/ui/use-toast'

import { SectionContainer, FlexContainer, VerticalCard, VerticalCardSkeleton, HorizontalCard, NothingFound } from '../index'


function LatestBlog() {
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {

        (async () => {

            setLoading(true);
            try {
              
                const response = await postService.getPosts();
                if(response.status == 200){
                    setPosts(response.results)
                }else{
                    toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
                }

            } catch (error) {
              toast({ variant: "destructive", title: 'Something went wrong.',})
            }finally{
              setLoading(false);
            }
      
          })();

    }, []);


  return (
    <SectionContainer
        title="Latest Posts"
        description="Read the latest posts published by authors">
            
        <FlexContainer>
        {
            loading ? 
            <>
                <VerticalCardSkeleton/>
                <VerticalCardSkeleton/>
                <VerticalCardSkeleton/>
            </> :
            posts.length>0 ?
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
                )) :
                <NothingFound
                    description="Sorry no posts were found."
                    buttonText="Go Home"
                    buttonLink="/"
                />
        }
        </FlexContainer>

            {/* <div className='px-20'>
                <HorizontalCard 
                    title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                    author="John Doe"
                    authorUUID="123"
                    postUUID="123"
                    tag="lorem"
                    // authorImg="https://miro.medium.com/v2/resize:fill:250:168/1*M2Kg81dKdity7YM8n3s8Fg.jpeg"
                    // postImg="https://miro.medium.com/v2/resize:fill:250:168/1*M2Kg81dKdity7YM8n3s8Fg.jpeg"
                />
            </div> */}
    </SectionContainer>
  )
}

export default LatestBlog