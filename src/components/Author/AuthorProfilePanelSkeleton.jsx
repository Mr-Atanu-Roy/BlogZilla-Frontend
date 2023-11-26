import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"
import { FlexContainer } from "../index"

function AuthorProfilePanelSkeleton({className=""}) {
  return (
    <div className={cn("px-10 py-6 w-full", className)}>
    <Skeleton className="rounded-full w-32 h-32" />
    <div className="my-3.5">
        <Skeleton className="w-[115px] h-4" />
        <Skeleton className="w-[200px] h-4 mt-1.5 mb-4" />
        <Skeleton className="w-24 h-3 mt-7" />
        <Skeleton className="w-32 h-3 my-2.5" />
        <Skeleton className="w-24 h-11 mt-6" />
    </div>
    <Skeleton className="w-full h-3 mt-7" />
    <Skeleton className="w-11/12 h-3 mt-1.5" />
    <Skeleton className="w-10/12 h-3 mt-1.5" />
    <Skeleton className="w-full h-3 mt-1.5" />
    <Skeleton className="w-10/12 h-3 mt-1.5" />

    <FlexContainer className="mt-5 justify-start items-start px-0">
        <Skeleton className="w-20 h-9 m-1.5" />
        <Skeleton className="w-20 h-9 m-1.5" />
        <Skeleton className="w-24 h-9 m-1.5" />
        <Skeleton className="w-20 h-9 m-1.5" />
        <Skeleton className="w-16 h-9 m-1.5" />
        <Skeleton className="w-20 h-9 m-1.5" />
        <Skeleton className="w-14 h-9 m-1.5" />
        <Skeleton className="w-20 h-9 m-1.5" />
        <Skeleton className="w-14 h-9 m-1.5" />
    </FlexContainer>

</div>
  )
}

export default AuthorProfilePanelSkeleton