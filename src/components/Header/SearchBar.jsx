import {useState, useEffect} from 'react'

import { postService, peopleService } from "../../service/index"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {Search} from "lucide-react"
import {
    HorizontalCard,
    HorizontalCardSkeleton,
    AuthorCardContainer,
    AuthorCardContainerSkeleton,
    Spinner,
} from '../index'
import { useDebounce } from 'use-debounce';
import { useToast } from '@/components/ui/use-toast'
import InfiniteScroll from 'react-infinite-scroll-component'

function SearchBar() {
    const {toast} = useToast()
    const [postLoading, setPostLoading] = useState(false)
    const [peopleLoading, setPeopleLoading] = useState(false)
    const [query, setQuery] = useState("")          //query from input field
    const [tab, setTab] = useState("posts")         //tab value
    const [posts, setPosts] = useState([])          //posts search results
    const [people, setPeople] = useState([])          //people search results
    const [postHasMore, setPostHasMore] = useState(true)     //post has more
    const [peopleHasMore, setPeopleHasMore] = useState(true)     //people has more
    const [postPage, setPostPage] = useState(1)     //post page number
    const [peoplePage, setPeoplePage] = useState(1)     //people page number

    const [debouncedQuery] = useDebounce(query, 750);           //debounced query


    const fetchPosts = async (value=debouncedQuery) => {
        console.log(value)
        try{
            const response = await postService.getPosts(postPage, value)
            if(response.status == 200){
                setPosts((prev)=>[...prev, ...response.results])
                if(response.next != null){
                    setPostPage((prev)=>prev+1)
                }else{
                    setPostHasMore(false)
                }
            }else{
                toast({ variant: "destructive", title: "Something went wrong. Please try again later."})
            }
        }catch(err){
            console.log(err)
            toast({ variant: "destructive", title: "Something went wrong"})
        }
    }

    const fetchPeople = async (value=debouncedQuery) => {
        try{
            const response = await peopleService.getPeople(peoplePage, value)
            if(response.status == 200){
                setPeople((prev)=>[...prev, ...response.results])
                if(response.next != null){
                    setPeople((prev)=>prev+1)
                }else{
                    setPeopleHasMore(false)
                }
            }else{
                toast({ variant: "destructive", title: "Something went wrong. Please try again later."})
            }
        }catch(err){
            console.log(err)
            toast({ variant: "destructive", title: "Something went wrong",})
        }
    }

    useEffect(()=>{
        if(debouncedQuery != ""){
            if(tab == "posts"){
                setPostLoading(true)
                setPosts([])
                setPostPage(1)
                setPostHasMore(true)
                fetchPosts(debouncedQuery).finally(()=>setPostLoading(false))

                setPeople([])
                setPeoplePage(1)
                setPeopleHasMore(true)
            }else{
                setPeopleLoading(true)
                setPeople([])
                setPeoplePage(1)
                setPeopleHasMore(true)
                fetchPeople(debouncedQuery).finally(()=>setPeopleLoading(false))

                setPosts([])
                setPostPage(1)
                setPostHasMore(true)
            }
        }else{
            setPosts([])
            setPostPage(1)
            setPostHasMore(true)

            setPeople([])
            setPeoplePage(1)
            setPeopleHasMore(true)
        }
    },[debouncedQuery, tab])


    const toggleTab = ()=>{
        if(tab == "posts") setTab("people")
        else setTab("posts")
    }

    

  return (
    <>
        <Dialog>
            <DialogTrigger>
                <div className="ml-3 flex items-center rounded-full bg-muted w-44 py-2.5 px-3">
                    <Search className="y" />
                    <p className="font-medium ml-2">Search.......</p>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="mb-4 ml-4">Search for anything</DialogTitle>
                    <div className='w-10/12 mx-auto pr-12 flex items-end'>
                        <div className='border-b-[2.5px] border-primary pb-2 pr-1.5'>
                        <Search />
                        </div>
                        <Input className="w-full" onChange={(e)=>setQuery((e.target.value).trim())} />
                    </div>
                </DialogHeader>
                <DialogDescription className="overflow-y-auto h-[70vh] mt-6">
                    <div className='w-10/12 mx-auto'>
                        <Tabs defaultValue="posts" className="w-11/12">
                            <TabsList className="sticky top-0 left-0 z-50">
                                <TabsTrigger value="posts" onClick={toggleTab}>posts</TabsTrigger>
                                <TabsTrigger value="people" onClick={toggleTab}>people</TabsTrigger>
                            </TabsList>
                            <TabsContent id="post-content" value="posts" className="w-full">
                                {
                                    postLoading ?
                                    <>
                                        <HorizontalCardSkeleton className='w-full' rating={false}/>
                                        <HorizontalCardSkeleton className='w-full' rating={false}/>
                                        <HorizontalCardSkeleton className='w-full' rating={false}/>
                                    </> :
                                    posts.length > 0 ?
                                    <InfiniteScroll 
                                    dataLength={posts.length}
                                    scrollableTarget="post-content"
                                    next={fetchPosts}
                                    hasMore={postHasMore}
                                    loader={<Spinner/>}>
                                        <div className="overflow-y-hidden">
                                        {
                                        posts.map((post)=>{
                                            return(
                                                <HorizontalCard 
                                                key={post.uuid}
                                                className='w-full'
                                                rating={false}
                                                postUUID={post.uuid}
                                                postImg={post.header_img}
                                                title={post.title}
                                                authorImg={post.user?.profile_pic}
                                                author={post.user?.first_name + " " + post.user?.last_name}
                                                authorUUID={post.user?.uuid}
                                                /> 
                                            )
                                        })
                                        }
                                        </div> 
                                    </InfiniteScroll>:
                                    <p className='text-sm text-muted-foreground font-medium'>
                                        {
                                            query == "" ?
                                            "Search for posts...." :
                                            "No post found...."
                                        }
                                    </p>          
                                }
                            </TabsContent>
                            <TabsContent id="people-content" value="people">
                                {
                                    peopleLoading ?
                                    <>
                                        <AuthorCardContainerSkeleton className='w-full'/>
                                        <AuthorCardContainerSkeleton className='w-full'/>
                                        <AuthorCardContainerSkeleton className='w-full'/>
                                    </> :
                                    people.length > 0 ?
                                    <InfiniteScroll 
                                    dataLength={people.length}
                                    scrollableTarget="people-content"
                                    next={fetchPeople}
                                    hasMore={peopleHasMore}
                                    loader={<Spinner/>}>
                                        <div className='overflow-y-hidden'>
                                        {
                                        people.map((author)=>{
                                            return(
                                                <AuthorCardContainer 
                                                className='w-full'
                                                key={author.uuid}
                                                author={author.first_name + " " + author.last_name}
                                                authorUUID={author.uuid}
                                                authorImg={author.profile_pic}
                                                    country={author.country}
                                                    blogsPublished={author.blogs_published_no}
                                                    bio={author.user_profile?.bio}
                                                    /> 
                                                    )
                                                })
                                        }
                                        </div>
                                    </InfiniteScroll>:
                                    <p className='text-sm text-muted-foreground font-medium'>
                                        {
                                            query == "" ?
                                            "Search for people...." :
                                            "No people found...."
                                        }
                                    </p>                                   
                                }
                            </TabsContent>
                        </Tabs>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default SearchBar