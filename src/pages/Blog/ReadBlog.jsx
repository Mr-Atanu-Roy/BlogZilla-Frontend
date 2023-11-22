import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { postService } from '../../service/index'

import { useToast } from '@/components/ui/use-toast'
import { SectionContainer, ContentHead, ContentBody, ContentFooter, ContentHeaderSkeleton, ContentBodySkeleton } from '../../components/index'

function ReadBlog() {
    const { uuid } = useParams()
    const {toast} = useToast()
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState({})

    
    useEffect(() => {

        (async () => {
            
            setLoading(true);
            try {
                if(uuid){
                  const response = await postService.retrievePost(uuid)
                  if(response.status == 200){
                      setContent(response)
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

    }, [uuid]);

  return (
    <SectionContainer sectionClass="mx-auto w-1/2 mt-14 mb-12">
        {
          loading ?
          <> 
            <ContentHeaderSkeleton/>
            <ContentBodySkeleton/>
          </> :
          <>
          <ContentHead 
              blogUUID={content.uuid}
              title={content.title}
              headerImg={content.header_img}
              authorUUID={content.user?.uuid}
              authCountry={content.user?.country}
              authorImg={content.user?.profile_pic}
              author={content.user?.first_name + " " + content.user?.last_name}
              likes={content.likes_no}
              comments={content.comments_no}
              date={content.created_at}
          />
          <ContentBody content={content.content} tags={content.tags_parsed}/>
          <ContentFooter/>
          </>
        }
    </SectionContainer>
  )
}

export default ReadBlog