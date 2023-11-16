import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { MoveRight, Eye, EyeOff } from "lucide-react"

function Signup() {
  const [passType, setPassType] = useState("password")
  const dispatch = useDispatch()
  const {toast} = useToast()
  const {register, handleSubmit} = useForm()
  

    const handelSignupFormError = (errors) => {
      if(errors.signup_email?.type == "required" && errors.signup_password?.type == "required"){
        toast({ variant: "destructive", title: 'Email and Password are required',})
      }else if(errors.signup_email?.type == "required"){
        toast({ variant: "destructive", title: 'Email is required',})
      }else if(errors.signup_password?.type == "required" ){
        toast({ variant: "destructive", title: 'Password is required',})
      }
      
      if(errors.signup_email?.type == "pattern") toast({ variant: "destructive", title: 'Email is invalid',})
      if(errors.signup_password?.type == "minLength") toast({ variant: "destructive", title: 'Password must be at least 3 characters.',})
      if(errors.signup_password?.type == "maxLength") toast({ variant: "destructive", title: 'Password must be at most 25 characters.',})
    }


    const signup =  async(data) => {
      try {
        //TODO: handel login logic
        data = {
            email: data.signup_email,
            password: data.signup_password
        }
        console.log(data)
      } catch (error) {
        
      }
    }


  return (
    <form onSubmit={handleSubmit(signup, handelSignupFormError)} className='px-16'>
        <div className="w-full">
                <Label htmlFor="email_signup" className="text-center block font-normal capitalize">Email</Label>
                <Input type="email" id="email_signup" className="mx-auto text-center mt-1 mb-10 text-base"
                  {...register("signup_email", {required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                />

                <Label htmlFor="password_signup" className="text-center block font-normal capitalize">password</Label>
                <Input type={passType} id="password_signup" className="mx-auto text-center mt-1 text-base"
                  {...register("signup_password", {required: true, minLength:3, maxLength: 25, })}
                />
                {
                    passType=="password" ? <Eye onClick={()=>setPassType("text")} className="relative -top-8 left-[90%] cursor-pointer"/> : <EyeOff onClick={()=>setPassType("password")} className="relative -top-8 left-[90%] cursor-pointer"  />
                }
        </div>  

        <div className="mt-10 text-center px-6">
            <Button type="submit" className="w-full">Signup <MoveRight className="ml-1.5 mt-1" /></Button>
        </div>
    </form>
  )
}

export default Signup