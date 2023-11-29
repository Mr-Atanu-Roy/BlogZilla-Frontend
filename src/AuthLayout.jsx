import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import { useToast } from '@/components/ui/use-toast'
import { Spinner } from './components/index'

function AuthLayout({children, authentication=true}) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const { toast } = useToast()

    useEffect(() => {

        try {
            setLoading(true);

            if (authentication && authStatus !== authentication){
                toast({ variant: "destructive", title: 'Please login to perform this action.',})
                navigate('/')
            }else if(!authentication && authStatus !== authentication){
                navigate("/")
            }
        } catch (error) {
            toast({ variant: "destructive", title: 'some error occured.',})
            navigate('/')
        }finally{
            setLoading(false)
        }

    }, [authStatus, navigate, authentication])

    return (
        loading ? 
        <Spinner 
        className='w-full h-[90vh] flex flex-col items-center justify-center text-xl font-bold'
        loaderClass='w-20 h-20 mb-8'
        isText={true}
        text='Loading .....'
        /> : 
        <>
            {children}
        </>
    )
}

export default AuthLayout