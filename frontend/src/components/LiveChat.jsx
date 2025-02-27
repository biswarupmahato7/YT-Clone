import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import { setMessage } from '../redux/chatSlice';
import { generateRandomName } from '../utils/helper';
import { generateRandomMessage } from '../utils/helper';

const LiveChat = () => {
  const message = useSelector((store) => store.chat.message);
  const dispatch = useDispatch();

  useEffect(()=>{
    const timer = setInterval(()=>{
         dispatch(setMessage({name:generateRandomName(), message:generateRandomMessage(16)}));
     },500)

     return(()=>{
         clearInterval(timer)
     })
     
 },[])

  return (
    <div>
        <div>
           {
            message.map((item ,idx)=>{
              return(
                <ChatMessage key={idx} item={item}/>
              )
            })
           }
        </div>
      
    </div>
  )
}

export default LiveChat
