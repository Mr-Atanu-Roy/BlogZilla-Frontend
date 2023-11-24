import {privateAxiosClient} from "./index";

class UserService{

    client = privateAxiosClient({
        baseURL: "user/",
    });

    async retrieveUserProfile(){
        try {
            const response = await this.client.get("me/");
            return {...response.data, status: response.status};
            
        } catch (error) {
            console.log("USER SERVICE :: RETRIEVE PROFILE ERROR :: ", error.message )
            return error.response;
        }
    }
    
    
}


const userService = new UserService();
export default userService;

