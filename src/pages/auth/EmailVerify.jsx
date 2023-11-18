import { useState } from 'react'
import { AuthBase } from '../../components/index'
import { useForm } from "react-hook-form"
import { useAPIErrors } from '../../hooks/index'
import { authService } from '../../service/index'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { MoveRight } from "lucide-react"


function EmailVerify() {
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const {register, handleSubmit} = useForm()

    const handelEmailVerifyFormError = (errors) => {
        if(errors.verify_email?.type == "required"){
            toast({ variant: "destructive", title: 'Email is required',})
        }else if(errors.verify_email?.type == "pattern"){
            toast({ variant: "destructive", title: 'Email is invalid',})
        }
    }

    const verifyEmailSubmitForm = async(data) => {
        setLoading(true)
        try {            
            const response = await authService.sendEmailVerificationLink({email: data.verify_email})
            if(response.status == 200 && response.data?.error == null){
                toast({ variant: "success", title: response.message.toUpperCase(),})
            }else if(response.status == 400 && response.data?.error){
                const responseErrors = useAPIErrors(response.data.error) //get the errors in array format
                for (let index = 0; index < responseErrors.length; index++) {
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

    const title = 'Verify Your Email'
    const description = 'Enter your email address and we will send you a link to verify your email.'
    const content = (
        <form onSubmit={handleSubmit(verifyEmailSubmitForm, handelEmailVerifyFormError)} className='px-14'>
            <Label htmlFor="verify_email" className="text-center block font-normal capitalize">Email</Label>
            <Input type="email" id="verify_email" className="mx-auto text-center mt-1 mb-3 text-base"
            {...register("verify_email", {required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}/>

           
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

export default EmailVerify