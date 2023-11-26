import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"


function VerticalCardSkeleton({
    tag=true, date=true
    }) {

    return (
        <Card className={`w-[320px] m-5 p-0 border-none shadow-none`}>
            <CardHeader className="p-0">
                
                <Skeleton className={`w-full h-52`}/>
                
                <CardDescription className="pt-4 px-1 flex justify-between items-center">
                        <div className="flex items-center">
                            <Skeleton className="rounded-full w-10 h-10"/>
                            <Skeleton className="ml-2 w-24 h-4"/>
                        </div>
                    {
                        tag &&
                        <Skeleton className="w-12 h-7"/>
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-0 pr-2 mt-6">
                <Skeleton className="h-4 w-full mb-1.5" />
                <Skeleton className="h-4 w-10/12 mb-1.5" />
                <Skeleton className="h-4 w-11/12 mb-1.5" />
            </CardContent>
            <CardFooter className="px-1 flex items-end justify-between text-sm font-medium text-gray-500">
                <div className='flex'>
                    <Skeleton className="w-24 h-8"/>
                </div>
                {
                    date &&
                    <Skeleton className="w-16 h-5"/>
                }
            </CardFooter>
        </Card>
    )

}


export default VerticalCardSkeleton

