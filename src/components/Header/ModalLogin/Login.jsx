import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {useAPIErrors} from '../../../hooks/index'
import {authService} from '../../../service/index'
import {login as authLogin} from '../../../store/features/authSlice'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "../../index"

import { MoveRight, Eye, EyeOff} from "lucide-react"

function Login() {

    const [passType, setPassType] = useState("password")
    const  [emailVerified, setEmailVerified] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {toast} = useToast()
    const {register, handleSubmit} = useForm()

    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        setEmailVerified(true)
        try {
            data = {
                email: data.login_email,
                password: data.login_password
            }
            
            const response = await authService.login(data)
            if(response.status == 200){
                toast({ variant: "success", title: "Logged In Successfully".toUpperCase(),})
                const token = {
                    access: response.access,
                    refresh: response.refresh
                } //obj of refresh and access tokens

                if(token) dispatch(authLogin(token)) //save user data to redux store
            }else if(response.status == 401 && response.data?.detail){
                const responseErrors = useAPIErrors(response.data.detail) //get the errors in array format
                for (let index = 0; index < responseErrors.length; index++) {
                    toast({ variant: "destructive", title: responseErrors[index].toUpperCase(),})
                }
            }else if(response.status == 400 && response.data){
                const responseErrors = useAPIErrors(response.data) //get the errors in array format
                for (let index = 0; index < responseErrors.length; index++) {
                    if(responseErrors[index].toLowerCase() == "email is not verified.".toLowerCase()) setEmailVerified(false)
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
        
        <div className='flex items-center justify-between'>
            <p className="text-right text-sm font-medium cursor-pointer hover:text-primary duration-200 transition-colors ease-in-out">
                <Link to="/auth/reset-password">Forgot password?</Link>
            </p>

            {
                !emailVerified &&
                <p className="text-right text-sm font-medium cursor-pointer hover:text-primary duration-200 transition-colors ease-in-out">
                    <Link to="/auth/verify-email" className='flex'>Verify Email <MoveRight className="w-5 h-5 ml-1" /></Link>
                </p>
            }
        </div>

        <div className="mt-10 text-center px-6">
            <Button type="submit" className={`w-full ${loading ? 'cursor-not-allowed' : ''}`} disabled={loading}>
                {
                  loading ? <Spinner isText={true} /> : <>Login <MoveRight className="ml-1.5 mt-1" /></>
                }
            </Button>
        </div>
    </form>
  )
}

export default Login