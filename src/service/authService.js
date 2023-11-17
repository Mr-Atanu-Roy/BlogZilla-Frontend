import axios from "axios";
import config from "../config/config";


class AuthService{

    client = axios.create();
    constructor() {
        this.client.defaults.headers.common['Content-Type'] = 'application/json';
        this.client.defaults.baseURL = `${config.BASE_API_ENDPOINT}auth/`;
    }

    async createAccount({email, password}) {
        try {
            const response = await this.client.post(
                "signup/",
                {
                    email,
                    password
                }
            );
            return response.data;
        } catch (error) {
            console.log("AUTH SERVICE :: CREATE ACCOUNT ERROR :: ", error.message)
            return error.response;
        }
    }

    async verifyEmail({uuid, token}) {
        try {
            const response = await this.client.post(
                "email-verify/",
                {
                    uidb64: uuid,
                    token
                }
            );
            return response.data;
            
        } catch (error) {
            console.log("AUTH SERVICE :: VERIFY EMAIL ERROR :: ", error.message )
            throw error;
        }
    }
    
    async sendPasswordRecoveryLink({email}) {

        try {
            const response = await this.client.get(
                "password-reset/",
                {
                    params: {email}
                }
            );
            return response.data;
            
        } catch (error) {
            console.log("AUTH SERVICE :: SEND PASSWORD RECOVERY LINK ERROR :: ", error.message )
            throw error;
        }
        
    }

    async resetPassword({uuid, token, password}){
        try {
            const response = await this.client.post(
                "password-reset/",
                {
                    uidb64: uuid,
                    token,
                    password
                }
            );
            return response.data;
            
        } catch (error) {
            console.log("AUTH SERVICE :: RESET PASSWORD ERROR :: ", error.message )
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const response = await this.client.post(
                "login/",
                {
                    email,
                    password
                }
            );
            return response.data;
            
        } catch (error) {
            console.log("AUTH SERVICE :: LOGIN ERROR :: ", error.message )
            return error.response;
        }
    }

    async getToken({refresh}){
        try {
            const response = await this.client.post(
                "token/refresh/",
                {
                    refresh
                }
            );
            return response.data;
            
        } catch (error) {
            console.log("AUTH SERVICE :: GET TOKEN ERROR :: ", error.message )
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;

