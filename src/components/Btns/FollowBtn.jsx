import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { userService } from '../../service/index'

import { useToast } from '@/components/ui/use-toast'
import { Button } from "@/components/ui/button"
import { Spinner } from '../index'

function FollowBtn({authorUUID, className='', followText="Follow", unfollowText="Unfollow"}) {
  const {toast} = useToast()
  const [loading, setLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  
  const user = useSelector((state) => state.auth)
  const userUUID = user?.status ? user?.userData?.uuid : null

  useEffect(() => {
    // check if user is following author
    const checkFollowing = async() => {
      setLoading(true)
      try{
        const response = await userService.isFollowing(authorUUID)
        if(response.status == 200 && response.following) setIsFollowing(true)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }

    if(authorUUID && userUUID && authorUUID != userUUID)  checkFollowing();

  }, [authorUUID, userUUID])

  const handleFollow = async() => {
    if(!userUUID){
      toast({ variant: "destructive", title: 'Please login to follow.',})
      return;
    }
    try{
      setLoading(true)
      const response = await userService.follow(authorUUID)
      if(response.status == 201) setIsFollowing(true)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const handleUnfollow = async() => {
    if(!userUUID){
      toast({ variant: "destructive", title: 'Please login to unfollow.',})
      return;
    }
    try{
      setLoading(true)
      const response = await userService.unfollow(authorUUID)
      if(response.status == 201) setIsFollowing(false)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  return (
    userUUID != authorUUID &&
    <Button className={`${className}`} variant={isFollowing ? "secondary" : "default"} onClick={isFollowing ? handleUnfollow : handleFollow}>{loading && <Spinner />} {isFollowing ? unfollowText : followText}</Button>
  )
}

export default FollowBtn