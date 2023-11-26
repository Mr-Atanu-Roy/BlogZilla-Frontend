import { cn } from "@/lib/utils"

import { Skeleton } from '@/components/ui/skeleton';

export default function AuthorCardContainerSkeleton({className=""}) {
  return (
    <div className={cn(`w-[530px] mb-7 py-2 flex items-center justify-between `, className)}>
      <div className="flex items-center w-[80%] pr-3.5">
          <Skeleton className='w-16 h-16 rounded-full'/>
          <div className="max-w-[74%] ml-4">
                <div className="flex items-center mb-2">
                    <Skeleton className='w-12 h-6'/>
                    <Skeleton className='w-12 h-6 ml-2.5'/>
                </div>
                <Skeleton className='w-36 h-3.5 mb-2'/>
                <Skeleton className='h-3 w-[100%]'/>
                <Skeleton className='h-3 mt-1 w-[85%]'/>
          </div>
      </div>
      <div>
          <Skeleton className="w-20 h-11" />
      </div>
  </div>
  )
}
