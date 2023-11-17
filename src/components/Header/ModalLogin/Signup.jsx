import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useAPIErrors} from '../../../hooks/index'
import {authService} from '../../../service/index'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { MoveRight, Eye, EyeOff } from "lucide-react"

function Signup() {
  const [passType, setPassType] = useState("password")
  const {toast} = useToast()
  const {register, handleSubmit} = useForm()

  const [loading, setLoading] = useState(false)
  
    const handelSignupFormError = (errors) => {
      setLoading(true)
      
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

      setLoading(false)
    }


    const signup =  async(data) => {
      setLoading(true)
      try {
        data = {
            email: data.signup_email,
            password: data.signup_password
        }

        const response = await authService.createAccount(data)
        
        //handel success response
        if(response.status == 201 && response.error == null){
          toast({ variant: "success", title: "Account created successfully. Please check your email to verify your account.".toUpperCase(),})
        }else if(response.status == 400 && response.data?.error){
          const responseErrors = useAPIErrors(response.data.error) //get the errors in array format
          for (let index = 0; index < responseErrors.length; index++) {
            toast({ variant: "destructive", title: responseErrors[index].toUpperCase(),})
          }
        }else{
          toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
        }
      } catch (error) {
        toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
      }finally{
        setLoading(false)
      }
      
    }


  return (
    <form onSubmit={handleSubmit(signup, handelSignupFormError)} className='px-16'>
        <div className="w-full">
            <Label htmlFor="signup_email" className="text-center block font-normal capitalize">Email</Label>
            <Input type="email" id="signup_email" className="mx-auto text-center mt-1 mb-10 text-base"
              {...register("signup_email", {required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
            />

            <Label htmlFor="signup_password" className="text-center block font-normal capitalize">password</Label>
            <Input type={passType} id="signup_password" className="mx-auto text-center mt-1 text-base"
              {...register("signup_password", {required: true, minLength:3, maxLength: 25, })}
            />
            {
                passType=="password" ? <Eye onClick={()=>setPassType("text")} className="relative -top-8 left-[90%] cursor-pointer"/> : <EyeOff onClick={()=>setPassType("password")} className="relative -top-8 left-[90%] cursor-pointer"  />
            }
        </div>  

        <div className="mt-10 text-center px-6">
            <Button type="submit" className={`w-full ${loading ? 'cursor-not-allowed' : null}`} disabled={loading}>
                {
                  loading ? <><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> Processing</> : <>Signup <MoveRight className="ml-1.5 mt-1" /></>
                }
                
            </Button>
        </div>
    </form>
  )
}

export default Signup

