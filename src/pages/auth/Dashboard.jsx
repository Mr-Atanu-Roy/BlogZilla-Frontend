import React from 'react'
import { userService } from '../../service/index'

export default function Dashboard() {
  React.useEffect(() => {
      const fetchData = async () => {
        const r = await userService.retrieveUserProfile()
        console.log(r)
      }

      fetchData();
  }, [])
  return (
    <div>Dashboard</div>
  )
}
