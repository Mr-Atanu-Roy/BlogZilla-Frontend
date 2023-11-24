import store from "../store/store"
import { getToken } from "../utils/handelTokens"


//returns refresh token: From --> 1.store, 2.local storage
function useGetRefreshToken(){

    //return refresh token from store if exists
    if(store.getState().auth.userData?.token?.refresh){
        return store.getState().auth.userData.token.refresh; //search store
    }

    //get the refresh token from local storage if exists
    const refreshToken = getToken();
    return refreshToken;

}


export default  useGetRefreshToken;

