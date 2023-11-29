import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {logout as authLogout} from '../../store/features/authSlice'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

import { UserCircle2, LogOut, BookUser, UserCheck } from "lucide-react"

function HeaderPopover() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toast} = useToast()
    const user = useSelector((state) => state.auth) || null
    const userName = user?.userData.name
    const userUUID = user?.userData.uuid

    const handelLogout = (e) => {
        e.preventDefault()
        dispatch(authLogout())
        toast({ title: "Logged Out Successfully".toUpperCase(),})
        navigate("/")
    }

    const userLinks = [
        {
          icon: <BookUser className="w-4 h-4 mr-1.5" />,
          title: "dashboard",
          href: "/dashboard",
        },
        {
          icon: <UserCheck className="w-4 h-4 mr-1.5" />,
          title: "public profile",
          href: `/author/${userUUID}`,
        },
    ]
      
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='border-none order-none focus:border-none focus:outline-none flex hover:bg-accent hover:text-accent-foreground cursor-pointer py-2.5 px-3.5 rounded-md'>
        <UserCircle2 className="h-6 w-6"/> <span className='ml-1 font-medium'>{userName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-6 mr-1 w-[245px] px-3 py-3.5">
          {userLinks.map((component) => (
            <Link to={component.href} className="capitalize flex select-none text-sm font-medium space-y-1 rounded-md py-1 mx-1 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground" key={component.title}>
              <DropdownMenuItem className="flex items-center cursor-pointer">{component.icon} {component.title}</DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuItem onClick={handelLogout} className="flex select-none text-sm font-medium space-y-1 rounded-md p-3 mx-1 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <LogOut className="w-4 h-4 mr-1.5" /> Logout
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeaderPopover