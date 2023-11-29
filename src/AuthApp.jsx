import { Outlet, ScrollRestoration } from "react-router-dom"

function AuthApp() {
  
  return (
    <>
    <section className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <Outlet />
    </section>
    <ScrollRestoration />
    </>
  )
}

export default AuthApp
