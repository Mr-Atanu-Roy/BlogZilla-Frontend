import { Link } from "react-router-dom"

import{
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { PenLine } from "lucide-react"

function EditPostBtn({postUUID, width="6", height="6", className}) {
  return (
    <>
        {
            postUUID &&
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link to={`/post/edit/${postUUID}`}>
                                <PenLine className='w-6 h-6 ml-2 pt-0.5'/>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit Your Post</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        }
    </>
)
}

export default EditPostBtn