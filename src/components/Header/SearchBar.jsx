import {useState, useRef, useEffect} from 'react'

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
import { HorizontalCard, HorizontalCardSkeleton, AuthorCardContainer, AuthorCardContainerSkeleton } from '../index'
import { useDebounce } from 'use-debounce';

function SearchBar() {
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState("")          //query from input field
    const [tab, setTab] = useState("posts")         //tab value
    const [searchResults, setSearchResults] = useState([])      //search results


    const handelSearch = async (e) => {
        try {
            setLoading(true)
            const value = (e.target.value).trim()
            if (value.length == 0) return;
            console.log(value)
            const [debouncedValue] = useDebounce(value, 500)
            console.log(debouncedValue)
            
            if(query.length == 0) return;
            // console.log(debouncedValue)

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    // useEffect(() => {
        

    // }, [query, tab])


    const toggleTab = ()=>{
        if(tab == "posts") setTab("people")
        else setTab("posts")
    }


{/* <div>
                        <div className="flex items-center space-x-4 mb-3">
                        <Skeleton className="h-12 w-12 rounded" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                        </div>
                    </div> */}
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
                        <Input className="w-full" onChange={handelSearch} />
                    </div>
                </DialogHeader>
                <DialogDescription className="overflow-y-auto h-[70vh] mt-6">
                    <div className='w-10/12 mx-auto'>
                        <Tabs defaultValue="people" className="w-11/12">
                            <TabsList className="sticky top-0 left-0 z-50">
                                <TabsTrigger value="posts" onClick={toggleTab}>posts</TabsTrigger>
                                <TabsTrigger value="people" onClick={toggleTab}>people</TabsTrigger>
                            </TabsList>
                            <TabsContent value="posts" className="w-full px-3">
                                {
                                    loading ? 
                                    <>
                                        <HorizontalCardSkeleton className='w-full' />
                                        <HorizontalCardSkeleton className='w-full' />
                                        <HorizontalCardSkeleton className='w-full' />
                                    </>: 
                                    <HorizontalCard 
                                    className='w-full'
                                    rating={false}
                                    authorImg={"https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    author={"John Doe"}
                                    authorUUID={"1"}
                                    title={"I will do it. Get it ready for me. — Read the previous part: The QuantumFront | Part 2 I need to be me  "}
                                    postImg={"https://images.unsplash.com/photo-1700839154423-83ea2246621b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    postUUID={"1"}
                                    />
                                }
                            </TabsContent>
                            <TabsContent value="people">
                                {
                                    loading ?
                                    <>
                                        <AuthorCardContainerSkeleton className='w-full'/>
                                        <AuthorCardContainerSkeleton className='w-full'/>
                                        <AuthorCardContainerSkeleton className='w-full'/>
                                    </> :
                                    <AuthorCardContainer 
                                        className='w-full'
                                        author={"John Doe"}
                                        authorUUID={"1"}
                                        authorImg={"https://images.unsplash.com/photo-1682687982141-0143020ed57a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                        country={"India"}
                                        blogsPublished={12}
                                        bio={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}

                                    />                                    
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