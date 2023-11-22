import React from 'react'
import { Button } from "@/components/ui/button"

function FollowBtn({authorUUID, className='', text="Follow"}) {
  return (
    <Button className={`${className}`}>{text}</Button>
  )
}

export default FollowBtn