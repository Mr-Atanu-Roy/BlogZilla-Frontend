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

    async deletePost(uuid){
        try{
            const response = await this.privateClient.delete(`${uuid}`);

            return {...response.data, status: response.status};
        }catch(error){
            console.log("POST SERVICE :: DELETE POSTS ERROR :: ", error.message )
            return error.response;
        }
    }

    async getPostComments(uuid, page=1){
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

    async createPostComment(uuid, data){
        try {
            const response = await this.privateClient.post(
                `${uuid}/comments`,
                data,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: CREATE COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }

    async updatePostComment(comment_uuid, data){
        try {
            const response = await this.privateClient.patch(
                `comments/${comment_uuid}`,
                data,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: UPDATE COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }

    async deletePostComment(comment_uuid){

        try {
            
            const response = await this.privateClient.delete(
                `comments/${comment_uuid}`,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: DELETE COMMENT ERROR :: ", error.message )
            return error.response;
        }

    }
    
    async getPostLikes(uuid, page=1){
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

    async likePost(uuid){
        try {
            const response = await this.privateClient.post(
                `${uuid}/likes`,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: LIKE POST ERROR :: ", error.message )
            return error.response;
        }
    }

    async dislikePost(uuid){
        try{
            const response = await this.privateClient.delete(
                `likes/${uuid}`,
            );

            return {...response.data, status: response.status};
        }catch(error){
            console.log("POST SERVICE :: DISLIKE POST ERROR :: ", error.message )
            return error.response;
        }
    }    

    async isPostLiked(uuid){
        try{
            const response = await this.privateClient.get(
                `likes/${uuid}`,
            );

            return {...response.data, status: response.status};
        }catch(error){
            console.log("POST SERVICE :: IS-LIKED POST ERROR :: ", error.message )
            return error.response;
        }
    }

    async getReplyComments(comment_uuid, page=1){
        try {
            const response = await this.publicClient.get(
                `comments/${comment_uuid}/reply`,
                {
                    params: {page}
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            
            console.log("POST SERVICE :: GET REPLY COMMENTS ERROR :: ", error.message )
            return error.response;
        }
    }

    async createReplyComment(comment_uuid, data){
        try {
            const response = await this.privateClient.post(
                `comments/${comment_uuid}/reply`,
                data,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: CREATE REPLY COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }

    async retrieveReplyComment(reply_uuid){
        try {
            const response = await this.publicClient.get(
                `comments/reply/${reply_uuid}`,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: RETRIEVE REPLY COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }

    async updateReplyComment(reply_uuid, data){
        try {
            const response = await this.privateClient.patch(
                `comments/reply/${reply_uuid}`,
                data,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: UPDATE REPLY COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }

    async deleteReplyComment(reply_uuid){
        try {
            const response = await this.privateClient.delete(
                `comments/reply/${reply_uuid}`,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: DELETE REPLY COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }
    
    async getCommentsLikes(comment_uuid, page=1){
        try {
            const response = await this.publicClient.get(
                `comments/${comment_uuid}/likes`,
                {
                    params: {page}
                }
            );

            return {...response.data, status: response.status};
            
        } catch (error) {
            
            console.log("POST SERVICE :: GET COMMENTS LIKE ERROR :: ", error.message )
            return error.response;
        }
    } 

    async likeComment(comment_uuid){
        try {
            const response = await this.privateClient.post(
                `comments/${comment_uuid}/likes`,
            );

            return {...response.data, status: response.status};
        } catch (error) {
            console.log("POST SERVICE :: LIKE COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }

    async dislikeComment(uuid){
        try{
            const response = await this.privateClient.delete(
                `comments/likes/${uuid}`,
            );

            return {...response.data, status: response.status};
        }catch(error){
            console.log("POST SERVICE :: DISLIKE COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }    

    async isCommentLiked(uuid){
        try{
            const response = await this.privateClient.get(
                `comments/likes/${uuid}`,
            );

            return {...response.data, status: response.status};
        }catch(error){
            console.log("POST SERVICE :: IS-LIKED COMMENT ERROR :: ", error.message )
            return error.response;
        }
    }
    
}


const postService = new PostService();
export default postService;

