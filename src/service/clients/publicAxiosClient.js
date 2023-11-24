import axios from "axios";
import config from "../../config/config";



function publicAxiosClient({
    baseURL = "",
    timeout = 30000,
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    
    }){
    
    const client = axios.create({
        baseURL: config.BASE_API_ENDPOINT+baseURL,
        timeout,
        headers,
    });


    return client;
}


export default publicAxiosClient;

