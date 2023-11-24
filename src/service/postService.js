import {privateAxiosClient, publicAxiosClient} from "./index";

class PostService{

    privateClient = privateAxiosClient({
        baseURL: "blog/",
    });
    publicClient = publicAxiosClient({
        baseURL: "blog/",
    });


    async getPosts(page=1, title='', name='', uuid='', latest=true, tags='', popular=false){
        try {
            const response = await this.publicClient.get(
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
            const response = await this.publicClient.get(`${uuid}`);

            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("POST SERVICE :: RETRIEVE POSTS ERROR :: ", error.message )
            return error.response;
        }
    }


    async createPost(data){
        try{
            const response = await this.privateClient.post(
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
            const response = await this.privateClient.patch(
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
            const response = await this.publicClient.get(
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
            const response = await this.publicClient.get(
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

