import { cn } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton";

function HorizontalCardSkeleton({
    className = "",
    rating=true 

    }) {

    let cardHeight = "h-52", componentHeight = "h-40";
    if(!rating){
      cardHeight = "h-40"
      componentHeight = "h-32" 
    }

    return (
      <div className={cn(`w-[530px] ${cardHeight} mb-4 py-5 flex items-center justify-between border-b-2 `, className)}>
        <div className={`flex flex-col items-start justify-between mr-2 ${componentHeight} w-[70%]`}>
            <div className="flex items-center justify-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-28 ml-2" />
            </div>
            <div className={`mt-3 w-full ${rating ? '' : 'relative -top-5'}`}>
                <Skeleton className="h-4 w-11/12 mb-1" />
                <Skeleton className="h-4 w-10/12 mb-1" />
            </div>
            {
              rating &&
              <div className="mt-4 w-full flex items-end justify-between">
                  <div className='flex'>
                    <Skeleton className="w-20 h-9" />
                    <Skeleton className="w-20 h-9 ml-5" />
                  </div>
                  <Skeleton className="w-16 h-8" />
              </div>
            }
        </div>
        <Skeleton className={`w-[26%] h-28`}/>
    </div>
    )
}

export default HorizontalCardSkeleton