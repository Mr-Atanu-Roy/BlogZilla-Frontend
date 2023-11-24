import store from "../store/store"


//returns access token: From store
function useGetAccessToken(){

    //return access token from store if exists
    if(store.getState().auth.userData?.token?.access){
        return store.getState().auth.userData.token.access; //search store
    }

    return null;

}


export default  useGetAccessToken;
