import { useState } from 'react'
import { AuthBase } from '../../components/index'
import { useForm } from "react-hook-form"
import { useParams } from 'react-router-dom'

import { useAPIErrors } from '../../hooks/index'
import { authService } from '../../service/index'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

import { MoveRight } from "lucide-react"


function ResetPasswordRedirect() {
    const {uuid, token} = useParams()
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit} = useForm()
    const {toast} = useToast()

    const [submitted, setSubmitted] = useState(false) //to check if the form is submitted or not


    const handelResetPassRedirectFormError = (errors) => {
        if(errors.new_password?.type == "required") toast({ variant: "destructive", title: 'Password is required',})
    }

    const resetPassRedirectSubmitForm = async(data) => {
        setLoading(true)
        setSubmitted(false)
        try {            
            const response = await authService.resetPassword({uuid, token, password: data.new_password})
            if(response.status == 200 && response.error == null){
                toast({ variant: "success", title: response.message.toUpperCase(),})
                setSubmitted(true)
            }else if(response.status == 400 && response.data?.error){
                const responseErrors = useAPIErrors(response.data.error) //get the errors in array format
                for (let index = 0; index < responseErrors.length; index++) {
                    toast({ variant: "destructive", title: responseErrors[index].toUpperCase(),})
                }
                setSubmitted(true)
            }else{
                toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
            }
            
        } catch (error) {
            toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
        }finally{
            setLoading(false)
        }
    }

   

    const title = 'Enter New Password'
    const description = 'Enter a new password and we will reset it if the link is valid.'
    const content = (
        <form onClick={handleSubmit(resetPassRedirectSubmitForm, handelResetPassRedirectFormError)} className='px-14'>
            <Label htmlFor="new_password" className="text-center block font-normal capitalize">New Password</Label>
            <Input type="text" id="new_password" className={`mx-auto text-center mt-1 mb-3 text-base ${submitted ? 'cursor-not-allowed' : ''}`}
            {...register("new_password", {required: true})} disabled={submitted}/>

            <div className="mt-10 text-center px-6">
                <Button type="submit" className={`w-full ${loading ? 'cursor-not-allowed' : null}`} disabled={loading || submitted}>
                    {
                    loading ? <><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Processing</> : <>Continue <MoveRight className="ml-1.5 mt-1" /></>
                    }
                </Button>
            </div>
        </form>
    )
        
    return (
        <AuthBase title={title} description={description} content={content}/>
    )
}

export default ResetPasswordRedirect