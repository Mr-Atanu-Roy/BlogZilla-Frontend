import { cn } from "@/lib/utils"

import { Skeleton } from '@/components/ui/skeleton'

function BlurCardContainerSkeleton({className=''}) {
  return (
    <div className={cn('w-[510px] h-[370px] bg-none backdrop-blur-md rounded-lg p-6 shadow-md ', className)}>
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-start" data-swiper-parallax="-300">
                <Skeleton className="w-12 h-12 rounded-full mr-3" />
                <div>
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-2.5 w-[90px] mt-1.5" />
                </div>
            </div>
            <Skeleton className="h-10 w-20" />
        </div>
        <div className="w-full flex items-center justify-end mt-7 mb-4">
            <Skeleton className="h-7 w-14" />               
            <Skeleton className="h-7 w-14 ml-2" />               
        </div>
        <div className="mb-3.5" data-swiper-parallax="-200">
            <Skeleton className="h-4 w-3/4" />
        </div>
        <div data-swiper-parallax="-100">
            <Skeleton className="h-2.5 mt-1.5 w-full" />
            <Skeleton className="h-2.5 mt-1.5 w-3/4" />
            <Skeleton className="h-2.5 mt-1.5 w-11/12" />
            <Skeleton className="h-2.5 mt-1.5 w-full" />
            <Skeleton className="h-2.5 mt-1.5 w-1/2" />
            <Skeleton className="h-2.5 mt-1.5 w-10/12" />
            <Skeleton className="h-2.5 mt-1.5 w-3/4" />

            <div className="flex items-end justify-between mt-6">
                <Skeleton className="h-9 rounded-full w-36" />
                <div className="flex">
                    <Skeleton className="h-9 w-20 mr-3" />
                    <Skeleton className="h-9 w-20" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlurCardContainerSkeleton