import React from 'react'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,

  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Share } from 'lucide-react'

function ShareBtn({width="6", height="6", className='', title, url}) {
  return (
    <div className={`${className}`}>
      <Popover>
        <PopoverTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Share className={`w-${width} h-${height} relative top-0.5 cursor-pointer`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent>
            <div className='flex w-full justify-between items-center'>
              <EmailShareButton
                className='mr-2.5'
                url={url}
                quote={title}>
                <EmailIcon size={36} />
              </EmailShareButton>

              <WhatsappShareButton
                className='mr-2.5'
                url={url}
                quote={title}>
                <WhatsappIcon size={36} />
              </WhatsappShareButton>
              
              <LinkedinShareButton
                className='mr-2.5'
                url={url}
                quote={title}>
                <LinkedinIcon size={36} />
              </LinkedinShareButton>

              <TwitterShareButton
                className='mr-2.5'
                url={url}
                quote={title}>
                <TwitterIcon size={36} />
              </TwitterShareButton>

              <FacebookShareButton
                url={url}
                quote={title}>
                <FacebookIcon size={36} />
              </FacebookShareButton>
            </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ShareBtn