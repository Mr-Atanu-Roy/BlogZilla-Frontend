import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

import {Header, Footer} from "./components/index"

import {login as authLogin} from './store/features/authSlice'
import { 
  useGetRefreshToken,
  useRequestTokens,
  useLogout,
} from "./hooks/index"


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

        const refreshToken = useGetRefreshToken();
        const tokens = await useRequestTokens(refreshToken);
        if(!tokens){ 
          //if no refresh token logout & return
          useLogout();
          return;
        }

        dispatch(authLogin(tokens));

      } catch (error) {
        useLogout()
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
