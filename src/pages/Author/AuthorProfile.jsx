import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { peopleService } from '../../service/index'

import { AuthorProfilePanel, AuthorProfilePanelSkeleton, AuthorTabs } from '../../components/index'
import { useToast } from '@/components/ui/use-toast'

function AuthorProfile() {
    const { uuid } = useParams()
    const[loading, setLoading] = useState(false)
    const [author, setAuthor] = useState({})
    const {toast} = useToast()

    useEffect(() => {

        const fetchAuthor = async () => {
            if(!uuid) return;
                
            try {
                setLoading(true)
                const response = await peopleService.profile(uuid)
                if(response.status == 200){
                    setAuthor(response)
                }else{
                    toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
                }
            } catch (error) {
                toast({ variant: "destructive", title: 'Something went wrong.',})
            }finally{
                setLoading(false)
            }
        }

        fetchAuthor();

    }, [uuid])
    


  return (
    <div className='grid grid-cols-5'>
        <div className='col-span-3 px-28 py-6'>
            <h3 className='text-3xl font-bold'>Admin Sharma</h3>
            <div className='mt-10'>
                <AuthorTabs authorUUID={uuid}/>
            </div>
        </div>
        <div className='col-span-2 pr-24'>
            <div className="sticky top-[104px] right-0">
            {
                loading ? 
                <AuthorProfilePanelSkeleton /> :
                <AuthorProfilePanel
                    authorUUID={author?.uuid}
                    authorName={author.first_name + ' ' + author.last_name}
                    authorBio={author.user_profile?.bio}
                    authorImg={author.profile_pic}
                    interests={author?.interests}
                    profession={author?.profession}
                    country={author.country}
                    follower={author.followers}
                    following={author.following}
                    blogs_published={author.blogs_published_no}
                />
            }
            </div>
        </div>
    </div>
  )
}

export default AuthorProfile