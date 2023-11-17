import {Header, Footer} from "./components/index"

import { Outlet } from "react-router-dom"

function App() {
  
  return (
    <>
    <Header />
      <main className="min-h-screen">
      <Outlet />
      </main>
    <Footer />
    </>
  )
}

export default App
