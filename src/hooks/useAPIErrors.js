//this hook return an array of errors from the errors of API response


export default function useAPIErrors(err) {
    let error = []
    
    try {
        if(typeof err === 'string'){
            error.push(err)
        }else if(typeof err === 'object'){
            const keys = Object.keys(err)
            for (let index = 0; index < keys.length; index++) {
                err[keys[index]][0].toLowerCase() == "this field is required." ? error.push(keys[index] + " is required.") : error.push(err[keys[index]][0])
            }
        }else{
            error.push("Something went wrong. Please try again later.")
        }
    } catch (error) {
        error.push("Something went wrong. Please try again later.")
    }
        
    return error

}

