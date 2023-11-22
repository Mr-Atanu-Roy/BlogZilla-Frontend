import React from 'react'

import { Skeleton } from "@/components/ui/skeleton"


function ContentHeaderSkeleton({className}) {
  return (
    <div className={`${className}`}>
      <div className='flex flex-col items-center justify-center w-full'>
          <Skeleton className="h-5 w-3/5 rounded-full" />
          <Skeleton className="mt-1.5 h-5 w-1/2 rounded-full" />
      </div>
      <div className='flex items-center justify-between my-11'>
          <div className='flex items-center justify-start'>
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className='flex flex-col ml-1.5'>
                <Skeleton className="h-4 w-24" />                  
                <Skeleton className="h-3 w-32 mt-1" />                  
            </div>
          </div>
          <Skeleton className="h-10 w-20" />
      </div>
        <Skeleton className="h-[300px] w-11/12 mx-auto my-10" />
    </div>
  )
}

export default ContentHeaderSkeleton