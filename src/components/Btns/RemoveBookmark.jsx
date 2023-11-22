import React from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { BookmarkCheck } from 'lucide-react'

function RemoveBookmark({width="6", height="6", className}) {
  return (
    <div className={`${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <BookmarkCheck className={`w-${width} h-${height} cursor-pointer`}/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove Bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default RemoveBookmark