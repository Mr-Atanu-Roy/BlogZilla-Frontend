import { cn } from "@/lib/utils"

import { FollowBtn, TagsBtn, FlexContainer } from "../index"

import { SmilePlus, Dot, UserCircle2, MapPin, Briefcase } from "lucide-react"

function AuthorProfilePanel({
    className="",
    authorUUID,
    authorName,
    authorBio,
    authorWebsite,
    authorImg,
    country,
    interests=[],
    profession,
    follower=0,
    following=0,
    blogs_published=0,
}) {
  return (
    <div className={cn("px-10 py-6 w-full", className)}>
        <div>
            {
                authorImg ? 
                <img src={authorImg} alt={authorName} className='rounded-full w-32 h-32 object-center object-cover mr-3' />:
                <UserCircle2 className="w-32 h-32" />
            }
        </div>
        <div className="my-3.5">
            <p className="font-bold text-xl">{authorName}</p>
            <p className="font-medium flex text-base items-center mt-1 mb-3.5 text-muted-foreground">
                <span>{follower} Followers</span> 
                <Dot className="w-5 h-5 mt-0.5 mx-0.5" />
                <span>{blogs_published} Posts Published</span> 
            </p>
            {
                country &&
                <div className="flex items-center my-2">
                    <MapPin className="text-muted-foreground mr-1 w-5 h-5"/>
                    <p className="font-medium text-muted-foreground">{country}</p>
                </div>
            }
            {
                profession &&
                <div className="flex items-center my-2 mb-5">
                    <Briefcase className="text-muted-foreground mr-1 w-5 h-5"/>
                    <p className="font-medium text-sm mt-0.5 text-muted-foreground">{profession}</p>
                </div>
            }
        </div>
        {
            authorBio &&
            <p className="mt-5">{authorBio}</p>
        }
        <div className="mt-4">
            <FollowBtn authorUUID={authorUUID}/>
        </div>
        {
            interests.length > 0 &&
            <div className="my-6">
                <div className="flex items-center mb-2">
                    <SmilePlus className="text-muted-foreground mr-1 w-5 h-5"/>
                    <p className="font-medium text-muted-foreground">Interests</p>
                </div>
                <FlexContainer className="p-0 justify-start m-0">
                    {
                        interests.map((interest, index) => (
                            <TagsBtn key={index} title={interest} />
                        ))
                    }
                </FlexContainer>
            </div>
        }
    </div>
  )
}

export default AuthorProfilePanel