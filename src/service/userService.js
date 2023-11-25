import {privateAxiosClient} from "./index";

class UserService{

    client = privateAxiosClient({
        baseURL: "user/",
    });

    async userProfile(){
        try {
            const response = await this.client.get("me/");
            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("USER SERVICE :: RETRIEVE PROFILE ERROR :: ", error.message )
            return error.response;
        }
    }

    async updateProfile(data){
        try {
            data.hasOwnProperty("profile_pic") ? content_type = "multipart/form-data" : content_type = "application/json";
            const response = await this.client.patch(
                "me/",
                data,
                {
                    headers: {
                        'Content-Type': content_type,
                    },
                }
            );
            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("USER SERVICE :: UPDATE PROFILE ERROR :: ", error.message )
            return error.response;
        }
    }

    async getPosts(page=1){
        try{
            const response = await this.client.get(
                "blog/",
                {
                    params: {page}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("USER SERVICE :: GET USER POSTS ERROR :: ", error.message )
            return error.response;
        }
    }

    async getFollowing(page=1, name='', country=''){
        try{
            const response = await this.client.get(
                "following/",
                {
                    params: {page, name, country}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("USER SERVICE :: GET USER FOLLOWING ERROR :: ", error.message )
            return error.response;
        }
    } 

    async getFollowers(page=1, name='', country=''){
        try{
            const response = await this.client.get(
                "followers/",
                {
                    params: {page, name, country}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("USER SERVICE :: GET USER FOLLOWERS ERROR :: ", error.message )
            return error.response;
        }
    } 

    async isFollowed(userUUID){

        try{
            const response = await this.client.get(
                `follow-unfollow/`,
                {
                    params: {user: userUUID}
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("USER SERVICE :: GET USER IS FOLLOWED ERROR :: ", error.message )
            return error.response;
        }

    }

    async follow(userUUID){
        try{
            const response = await this.client.post(
                `follow-unfollow/`,
                {
                    action: "follow",
                    user: userUUID
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("USER SERVICE :: FOLLOW USER ERROR :: ", error.message )
            return error.response;
        }
    }

    async unfollow(userUUID){
        try{
            const response = await this.client.post(
                `follow-unfollow/`,
                {
                    action: "unfollow",
                    user: userUUID
                }
            );
            return {...response.data, status: response.status};
        }catch(error){
            console.log("USER SERVICE :: UNFOLLOW USER ERROR :: ", error.message )
            return error.response;
        }
    }
    
}


const userService = new UserService();
export default userService;

