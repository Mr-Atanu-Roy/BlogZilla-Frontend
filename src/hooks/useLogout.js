import { logout } from "../store/features/authSlice";
import store from "../store/store"


function useLogout(){
    store.dispatch(logout());
}


export default useLogout;

