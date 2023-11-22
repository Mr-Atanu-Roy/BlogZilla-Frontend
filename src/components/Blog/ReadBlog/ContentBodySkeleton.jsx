import React from 'react'

import { Skeleton } from "@/components/ui/skeleton"

function ContentBodySkeleton({className}) {
  return (
    <div className={`${className}`}>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 mt-1.5 w-full" />
        <Skeleton className="h-5 mt-1.5 w-3/5" />
        <Skeleton className="h-5 mt-1.5 w-full" />
        <Skeleton className="h-5 mt-1.5 w-1/2" />
        <Skeleton className="h-5 mt-1.5 w-11/12" />
        <Skeleton className="h-5 mt-1.5 w-full" />
        <Skeleton className="h-5 mt-1.5 w-3/5" />
        <Skeleton className="h-5 mt-1.5 w-3/5" />
        <Skeleton className="h-5 mt-1.5 w-full" />
        <Skeleton className="h-5 mt-1.5 w-1/2" />
        <Skeleton className="h-5 mt-1.5 w-4/5" />
        <Skeleton className="h-5 mt-1.5 w-3/5" />
        <Skeleton className="h-5 mt-1.5 w-3/5" />
        <Skeleton className="h-5 mt-1.5 w-full" />
        <Skeleton className="h-5 mt-1.5 w-1/2" />
        <Skeleton className="h-5 mt-1.5 w-4/5" />
    </div>
  )
}

export default ContentBodySkeleton