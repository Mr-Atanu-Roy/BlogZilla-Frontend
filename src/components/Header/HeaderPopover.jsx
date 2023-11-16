import React from 'react'
import { useSelector } from 'react-redux'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { UserCircle2, LogOut, BookUser } from "lucide-react"

function HeaderPopover() {
    const userName = useSelector((state) => state.auth.userData.name)

    const userLinks = [
        {
          icon: <BookUser className="w-4 h-4 mr-1" />,
          title: "Dashboard",
          href: "",
        },
        {
          icon: <LogOut className="w-4 h-4 mr-1" />,
          title: "Logout",
          href: "",
        },
      ]
      
  return (
    <Popover>
        <PopoverTrigger className="flex hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer py-2.5 px-3.5 rounded-md">
          <UserCircle2 className="h-6 w-6"/> <span className='ml-1 font-medium'>{userName}</span>
        </PopoverTrigger>
        <PopoverContent className="mr-3 mt-6">
        {userLinks.map((component) => (
            // TODO: change to Link
            <a className="flex select-none text-sm font-medium space-y-1 rounded-md p-3 mx-1 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" key={component.title}>
              {component.icon} {component.title}
            </a>
          ))}
        </PopoverContent>
    </Popover>
  )
}

export default HeaderPopover