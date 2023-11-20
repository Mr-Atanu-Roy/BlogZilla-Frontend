import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

import {getToken} from './utils/handelTokens'
import {Header, Footer} from "./components/index"

import {login as authLogin, logout as authLogout} from './store/features/authSlice'
import { authService } from './service/index'


function App() {
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {   
    (async () => {

      setLoading(true);
      try {
        if(authStatus) return; //if user is already logged in return

        const token = getToken();
        if (!token) return;

        const response = await authService.getToken({refresh: token.refresh})
        if(response.status != 200){
          dispatch(authLogout())
          return;
        };

        //update store after token is obtained
        dispatch(authLogin(
          {
            access: response.access,
            refresh: response.refresh
          }
        ))

      } catch (error) {
        dispatch(authLogout())
        toast({ variant: "destructive", title: 'Something went wrong.',})
      }finally{
        setLoading(false);
      }

    })();
  }, []);
  
  return (
    <>
    {
      !loading && 
      <>
        <Header />
        <main className="min-h-screen">
        <Outlet />
        </main>
        <Footer />
      </>
    }
    </>
  )
}

export default App
