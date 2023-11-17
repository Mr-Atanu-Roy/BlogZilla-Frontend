import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {logout as authLogout} from '../../store/features/authSlice'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

import { UserCircle2, LogOut, BookUser } from "lucide-react"

function HeaderPopover() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toast} = useToast()
    const userName = useSelector((state) => state.auth.userData.name)

    const handelLogout = (e) => {
        e.preventDefault()
        dispatch(authLogout())
        toast({ title: "Logged Out Successfully".toUpperCase(),})
        navigate("/")
    }

    const userLinks = [
        {
          icon: <BookUser className="w-4 h-4 mr-1" />,
          title: "Dashboard",
          href: "/dashboard",
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
            <Link to="/dashboard" className="flex select-none text-sm font-medium space-y-1 rounded-md p-3 mx-1 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" key={component.title}>
              {component.icon} {component.title}
            </Link>
          ))}
            <div onClick={handelLogout} className="flex select-none text-sm font-medium space-y-1 rounded-md p-3 mx-1 cursor-pointer leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </div>
          
        </PopoverContent>
    </Popover>
  )
}

export default HeaderPopover