import React, { useEffect } from 'react'
import axios from 'axios'
import {YT_VIDEO_API, API_KEY} from '../config/config.js'

const VideoContainer = () => {
  const fetchVideo = async ()=>{
    try{

      const res = await axios.get(YT_VIDEO_API + API_KEY)
      console.log(res)
    }catch(error){
      console.log( "Error Fetching Videos: ",error)
    }
  }

   useEffect(()=>{
       fetchVideo()
   },[])

  return (
    <div>
      
    </div>
  )
}

export default VideoContainer
