
import { Skeleton } from "@/components/ui/skeleton"

function LikesContainerSkeleton() {
  return (
    <div className="flex items-start space-x-4 mb-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div>
            <div className='w-full flex items-center justify-between'>
                <Skeleton className="h-4 w-[125px]" />
                <Skeleton className="h-10 w-20 ml-10" />
            </div>
            <Skeleton className="h-4 w-[62px]" />
        </div>
    </div>
  )
}

export default LikesContainerSkeleton