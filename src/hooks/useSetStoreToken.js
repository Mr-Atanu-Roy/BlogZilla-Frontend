import store from "../store/store"
import { setToken } from "../store/features/authSlice";


//calls the setToken action from authSlice
//token format --> {access: "", refresh: ""}
function useSetStoreToken(tokens){

    if(!tokens) return;

    store.dispatch(setToken(tokens))

}


export default  useSetStoreToken;

