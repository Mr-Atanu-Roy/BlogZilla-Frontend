import {Header, Footer} from "./components/index"
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <>
    <Header />
      <main className="min-h-screen">
      <Outlet />
      </main>
    <Footer />
    <Toaster />
    </>
  )
}

export default App
