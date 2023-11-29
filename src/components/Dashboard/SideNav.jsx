import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { UserCircle2, UserCheck, Snail, Settings } from 'lucide-react'

function SideNav() {
  
  const user = useSelector((state) => state.auth) || null
  const userName = user?.userData.name

  const navItems = [
    {
      icon: <UserCircle2 className="w-7 h-7 mr-2.5" />,
      title: "dashboard",
      href: "/dashboard",
    },
    {
      icon: <Snail className="w-7 h-7 mr-2.5" />,
      title: "blogs",
      href: "/dashboard/blogs",
    },
    {
      icon: <UserCheck className="w-7 h-7 mr-2.5" />,
      title: "followers",
      href: "/dashboard/followers",
    },
    {
      icon: <UserCheck className="w-7 h-7 mr-2.5" />,
      title: "following",
      href: "/dashboard/following",
    },
    {
      icon: <Settings className="w-7 h-7 mr-2.5" />,
      title: "settings",
      href: "/dashboard/settings",
    },
  ]

  return (
    <div className='flex flex-col h-screen overflow-y-auto p-7 px-0 border-r'>
        <div className='w-full mb-16 flex flex-col items-center justify-center'>
            <img src="https://images.unsplash.com/photo-1695653422279-8a8a52ccb3cc?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='mb-4 w-32 h-32 rounded-full object-center object-cover '/>
            <h3 className='capitalize font-bold text-lg'>{userName}</h3>
        </div>
        <div className='w-full'>
          <ToggleGroup type="single" className="w-full flex flex-col">
            {
              navItems.map((item, index) => {
                return (
                  <Link className='flex w-full' to={item.href} key={index} >
                    <ToggleGroupItem value={item.title} className="w-full px-10 rounded-none my-0.5 justify-start capitalize text-lg">
                      {item.icon} {item.title}
                    </ToggleGroupItem>
                  </Link>
                )
              })
            }
          </ToggleGroup>
        </div>
    </div>
  )
}

export default SideNav