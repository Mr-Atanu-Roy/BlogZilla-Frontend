import { useState } from 'react'
import { AuthBase } from '../../components/index'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { useAPIErrors } from '../../hooks/index'
import { authService } from '../../service/index'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { MoveRight } from "lucide-react"


function ResetPassword() {
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const {register, handleSubmit} = useForm()
    const [verifyEmail, SetVerifyEmail] = useState(false)

    const handelResetPassFormError = (errors) => {
        if(errors.forgot_pass_email?.type == "required"){
            toast({ variant: "destructive", title: 'Email is required',})
        }else if(errors.forgot_pass_email?.type == "pattern"){
            toast({ variant: "destructive", title: 'Email is invalid',})
        }
    }

    const resetPassSubmitForm = async(data) => {
        setLoading(true)
        SetVerifyEmail(false)
        try {            
            const response = await authService.sendPasswordRecoveryLink({email: data.forgot_pass_email})
            if(response.status == 200 && response.error == null){
                toast({ variant: "success", title: response.message.toUpperCase(),})
            }else if(response.status == 400 && response.data?.error){
                const responseErrors = useAPIErrors(response.data.error) //get the errors in array format
                for (let index = 0; index < responseErrors.length; index++) {
                    if(responseErrors[index].toLowerCase() == "account with this email is not verified.".toLowerCase()) SetVerifyEmail(true)
                    toast({ variant: "destructive", title: responseErrors[index].toUpperCase()})
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

    const title = 'Reset Your Password'
    const description = 'Enter your email address and we will send you a link to reset your password.'
    const content = (
        <form onSubmit={handleSubmit(resetPassSubmitForm, handelResetPassFormError)} className='px-14'>
            <Label htmlFor="forgot_pass_email" className="text-center block font-normal capitalize">Email</Label>
            <Input type="email" id="forgot_pass_email" className="mx-auto text-center mt-1 mb-3 text-base"
            {...register("forgot_pass_email", {required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}/>

            {
            verifyEmail && 
                <Link to="/auth/verify-email" className="flex justify-end w-full text-sm font-medium cursor-pointer hover:text-primary duration-200 transition-colors ease-in-out">
                Verify Email <MoveRight className='ml-1 h-4 w-4 mt-0.5'/>
                </Link>
            }

            <div className="mt-10 text-center px-6">
                <Button type="submit" className={`w-full ${loading ? 'cursor-not-allowed' : null}`} disabled={loading}>
                    {
                    loading ? <><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Processing</> : <>Send Link <MoveRight className="ml-1.5 mt-1" /></>
                    }
                </Button>
            </div>
        </form>
    )
        
    return (
        <AuthBase title={title} description={description} content={content}/>
    )
}

export default ResetPassword