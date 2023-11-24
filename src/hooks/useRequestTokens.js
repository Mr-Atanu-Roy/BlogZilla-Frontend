import { authService } from "../service/index";


//returns access, refresh tokens: From server using refresh token
async function useRequestTokens(refreshToken){

    if(!refreshToken) return null;

    const response = await authService.getToken({refresh: refreshToken});
    if(response.status !== 200) return null;
    return {
        access: response.access,
        refresh: response.refresh
    }
}


export default  useRequestTokens;

