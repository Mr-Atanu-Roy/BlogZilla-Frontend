import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

import { FollowBtn } from "../index"
import { UserCircle, MapPin, Snail } from "lucide-react"

function AuthorCardContainer({
    className='',
    blogsPublished=0,
    author, authorUUID, authorImg,
    country, bio
}) {

    if(bio && bio.length > 100) bio = bio.slice(0, 96) + "....."

  return (
    <div className={cn(`w-[530px] mb-7 py-2 flex items-center justify-between `, className)}>
        <div className="flex items-center">
            <Link to={`/author/${authorUUID}`}>
                {
                    authorImg ? 
                    <img src={authorImg} className="rounded-full w-16 h-16 object-center object-cover" /> :
                    <UserCircle className="w-14 h-14" />
                }
            </Link>
            <div className="max-w-[74%] ml-5">
                <div className="flex items-center">
                    {
                        country &&
                        <Link to={""} className="flex items-center">
                            <MapPin className="w-4 h-4"/> <p className='text-sm text-muted-foreground capitalize ml-0.5'>{country}</p>
                        </Link>
                    }
                    {
                        blogsPublished>0 &&
                        <Link to={""} className="flex items-center ml-2.5">
                            <Snail className="w-4 h-4"/> <p className='text-sm text-muted-foreground capitalize ml-0.5'>blogs: {blogsPublished}</p>
                        </Link>
                    }
                </div>
                <Link to={`/author/${authorUUID}`}>
                    <p className='text-lg text-black font-medium break-words'>{author}</p>
                    <p className='text-sm text-muted-foreground text-black w-full pr-2'>{bio}</p>
                </Link>
                
            </div>
        </div>
        <div>
            <FollowBtn authorUUID={authorUUID} />
        </div>
    </div>
  )
}

export default AuthorCardContainer