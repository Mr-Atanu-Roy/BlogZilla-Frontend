import { Outlet } from "react-router-dom"

function AuthApp() {
  
  return (
    <>
    <section className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <Outlet />
    </section>
    </>
  )
}

export default AuthApp
