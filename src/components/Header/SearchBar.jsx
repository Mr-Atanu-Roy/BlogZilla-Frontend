import {useState, useRef} from 'react'
import { Link } from 'react-router-dom'

import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {X} from "lucide-react"

function SearchBar() {
    const [isSearched, setIsSearched] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    const inputRef = useRef(null)

    const handelSearch = (e) => {
        e.preventDefault()
        try{
            const query = e.target.value.trim()
            if(query == "") return
            setLoading(true)
            setIsSearched(true)
        }catch{

        }finally{
            setLoading(false)
        }
    }

    const closeSearch = () => {
        setIsSearched(false)
        setLoading(false)
        setSearchResults([])
        inputRef.current.value = ""
    }

  return (
    <>
        <div className='flex ml-3'>
            <Input type="text" placeholder="Search for anything" className="w-[215px]" ref={inputRef} onChange={handelSearch}/>
        </div>
        {
            isSearched &&
            <div className="bg-white absolute top-24 left-20 p-4 w-[350px] max-h-[480px] overflow-y-auto shadow-md">
                <div className="mb-4 flex items-center justify-end cursor-pointer" onClick={closeSearch}><X/></div>

                {
                    loading ? 
                    <div>
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
                    </div> :
                    
                    ""
                    
                }
            </div>
        }
    </>
  )
}

export default SearchBar