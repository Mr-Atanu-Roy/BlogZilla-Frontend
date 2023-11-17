import { useState } from "react"

export default async function useFetch(callback, data) {
    const [status, setStatus] = useState(null)
    const [response, setResponse] = useState(null)
    const [errors, setError] = useState([])

    try {
        setResponse(null)
        setError([])
        setStatus(null)

        const fetchResource = await callback(data)
        // console.log(fetchResource)
        //handel success response
        if(fetchResource.status == 201 && fetchResource.data?.error == null){
            setStatus(fetchResource.status)
            setResponse(fetchResource.data)
            setError([])
        }
    } catch (error) {
        if(error.status == 400 && error.data?.error){
            if(typeof error.data?.error === 'string'){
                setError([...errors, error.data.error])
            }else if(typeof error.data?.error === 'object'){
                const keys = Object.keys(error.data.error)
                    for (let index = 0; index < keys.length; index++) {
                        setError([...errors, error.data.error[keys[index]][0]])
                    }
            }
        }else{
            setError([...errors, "Something went wrong. Please try again later."])
        }
    }

    return [status, response, errors]
}
