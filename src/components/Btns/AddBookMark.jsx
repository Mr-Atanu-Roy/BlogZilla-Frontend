import React from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Bookmark } from 'lucide-react'


function AddBookMark({width="6", height="6", className=''}) {
  return (
    <div className={`${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Bookmark className={`w-${width} h-${height} cursor-pointer`}/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bookmark Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default AddBookMark