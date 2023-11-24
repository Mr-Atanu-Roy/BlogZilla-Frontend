import { Skeleton } from "@/components/ui/skeleton"

function CommentContainerSkeleton() {
  return (
    <div className="flex items-start space-x-4 mb-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
        </div>
    </div>
  )
}

export default CommentContainerSkeleton