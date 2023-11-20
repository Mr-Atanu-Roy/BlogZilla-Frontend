import axios from "axios";
import config from "../config/config";
import { getToken } from "../utils/handelTokens";

class PostService{

    client = axios.create();
    constructor() {
        this.client.defaults.headers.common['Content-Type'] = 'application/json'
        this.client.defaults.baseURL = `${config.BASE_API_ENDPOINT}blogs/`

        const token = getToken()
        if (token) this.client.defaults.headers.common['Authorization'] = `Bearer ${getToken().access}`
    }


    async getPosts(page=null, title='', name='', uuid='', latest=true, tags='', popular=false){
        try {
            let params = {title, name, uuid, latest, tags, popular}
            if (page != null) params = {page, ...params}
            const response = await this.client.get(
                "",
                {
                    params: params
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("POST SERVICE :: GET POSTS ERROR :: ", error.message )
            return error.response;
        }
    }

    
    
}


const postService = new PostService();
export default postService;

