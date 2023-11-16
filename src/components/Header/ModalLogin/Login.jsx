import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { MoveRight, Eye, EyeOff} from "lucide-react"

function Login() {

    const [passType, setPassType] = useState("password")
    const dispatch = useDispatch()
    const {toast} = useToast()
    const {register, handleSubmit} = useForm()

    const handelLoginFormError = (errors) => {
        if(errors.login_email?.type == "required" && errors.login_password?.type == "required"){
            toast({ variant: "destructive", title: 'Email and Password are required',})
        }else if(errors.login_email?.type == "required"){
            toast({ variant: "destructive", title: 'Email is required',})
        }else if(errors.login_password?.type == "required" ){
            toast({ variant: "destructive", title: 'Password is required',})
        }

        if(errors.login_email?.type == "pattern") toast({ variant: "destructive", title: 'Email is invalid',})
    }

    
    const login =  async(data) => {
        //TODO: handel login logic
        data = {
            email: data.login_email,
            password: data.login_password
        }
        console.log(data)
    }

  return (
    <form onSubmit={handleSubmit(login, handelLoginFormError)} className='px-16'>
        <div className="w-full">
            <Label htmlFor="login_email" className="text-center block font-normal capitalize">Email</Label>
            <Input type="email" id="login_email" className="mx-auto text-center mt-1 mb-10 text-base" 
                {...register("login_email", {required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
            />

            <Label htmlFor="login_password" className="text-center block font-normal capitalize">password</Label>
            <Input type={passType} id="login_password" className="mx-auto text-center mt-1 text-base"
                {...register("login_password", {required: true})}
            />
            {
                passType=="password" ? <Eye onClick={()=>setPassType("text")} className="relative -top-8 left-[90%] cursor-pointer"/> : <EyeOff onClick={()=>setPassType("password")} className="relative -top-8 left-[90%] cursor-pointer"  />
            }
        </div>  

        <p className="text-right text-sm font-medium cursor-pointer hover:text-primary duration-200 transition-colors ease-in-out">
            {/* TODO: add react-router-dom link */}
            Forgot password?
        </p>

        <div className="mt-10 text-center px-6">
            <Button type="submit" className="w-full">Login <MoveRight className="ml-1.5 mt-1" /></Button>
        </div>
    </form>
  )
}

export default Login