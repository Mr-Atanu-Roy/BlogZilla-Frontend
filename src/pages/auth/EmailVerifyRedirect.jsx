import { useEffect, useState } from 'react'
import { useAPIErrors } from '../../hooks/index'
import { authService } from '../../service/index'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {X, CheckCircle, XOctagon} from 'lucide-react'


function EmailVerifyRedirect() {
    const {uuid, token} = useParams()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [description, setDescription] = useState('')

    useEffect(() => {
        ;(async ()=>{
            setLoading(true)
            setSuccess(null)
            try {
                const response = await authService.verifyEmail({uuid, token})
                if(response.status == 200 && response.error == null){
                    setDescription('Your email has been verified successfully.')
                    setSuccess(true)
                }else if(response.status == 400 && response.data?.error){
                    const responseErrors = useAPIErrors(response.data.error) //get the errors in array format
                    console.log(responseErrors)
                    let error = ""
                    for (let index = 0; index < responseErrors.length; index++) {
                        error += responseErrors[index]+" "
                    }
                    setDescription(error)
                    setSuccess(false)
                }else{
                    setDescription('Something went wrong. Please try again later.')
                    setSuccess(false)
                }
            } catch (error) {
                setDescription('Something went wrong. Please try again later.')
                setSuccess(false)
            }finally{
                setLoading(false)
            }
        })()
    }, [uuid, token])
    
  return (
    <Card className="w-[450px] shadow-md">
        <div className="text-right mt-3.5 mr-3.5">
          <Link to="/"><X className='ml-auto'/></Link>
        </div>
        <CardHeader>
            <CardTitle>
                {
                    loading && 
                    <div className='flex flex-col items-center justify-center'>
                        <svg class="animate-spin  h-24 w-24 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> 
                        <span className='mt-8 text-lg'>
                            Validating URL ...
                        </span>
                    </div>
                }
                <div className="w-full flex items-center justify-center">
                    {success == true && <CheckCircle className='w-16 h-16 text-green-600'/>}
                    {success == false && <XOctagon className='w-16 h-16 text-red-600'/>}
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="text-center mt-3 mx-4">
            {description}
        </CardContent>
    </Card>
  )
}

export default EmailVerifyRedirect