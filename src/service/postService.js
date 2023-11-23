import axios from "axios";
import config from "../config/config";
import { getToken } from "../utils/handelTokens";

class PostService{

    client = axios.create();
    constructor() {
        this.client.defaults.headers.common['Content-Type'] = 'application/json'
        this.client.defaults.baseURL = `${config.BASE_API_ENDPOINT}blog/`

        const token = getToken()
        if (token) this.client.defaults.headers.common['Authorization'] = `Bearer ${getToken().access}`
    }


    async getPosts(page=1, title='', name='', uuid='', latest=true, tags='', popular=false){
        try {
            const response = await this.client.get(
                "",
                {
                    params: {title, name, uuid, latest, tags, popular, page}
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("POST SERVICE :: GET POSTS ERROR :: ", error.message )
            return error.response;
        }
    }

    async retrievePost(uuid){
        try{
            const response = await this.client.get(`${uuid}`);

            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("POST SERVICE :: RETRIEVE POSTS ERROR :: ", error.message )
            return error.response;
        }
    }


    async createPost(data){
        try{
            const response = await this.client.post(
                "",
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("POST SERVICE :: CREATE POSTS ERROR :: ", error.message )
            return error.response;
        }
    }

    
    async updatePost(uuid, data){
        try{
            const response = await this.client.patch(
                `${uuid}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            return {...response.data, status: response.status};
        }catch(error){
            console.log("POST SERVICE :: UPDATE POSTS ERROR :: ", error.message )
            return error.response;
        }
    }

    async getComments(uuid, page=1){
        try {
            const response = await this.client.get(
                `${uuid}/comments`,
                {
                    params: {page}
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            
            console.log("POST SERVICE :: GET COMMENTS ERROR :: ", error.message )
            return error.response;
        }
    }
    
    async getLikes(uuid, page=1){
        try {
            const response = await this.client.get(
                `${uuid}/likes`,
                {
                    params: {page}
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            
            console.log("POST SERVICE :: GET COMMENTS ERROR :: ", error.message )
            return error.response;
        }
    }
    
    
}


const postService = new PostService();
export default postService;

