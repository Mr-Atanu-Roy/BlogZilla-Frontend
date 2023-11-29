import { Outlet } from "react-router-dom"

import { SideNav } from "../components/index"

export default function Dashboard() {

  return (
    <>
    <section className="w-full min-h-screen grid grid-cols-8">
        <div className="col-span-2">
            <SideNav />
        </div>
        <div className="col-span-6 h-screen overflow-y-hidden p-6">
          <Outlet />
        </div>
    </section>
    </>
  )
}
