import {BiCheckCircle, BiErrorCircle } from "react-icons/bi"

export default function Message({message}) {
  if (message.success) {
    return(
      <div className='flex items-center font-poppins gap-2 px-5 text-green-500'>
        <BiCheckCircle size={50}/>
        {message.message}
      </div>
    )
  } else if (message.error) {
    return(
      <div className='flex items-center font-poppins gap-2 px-5 text-red-500'>
        <BiErrorCircle size={50}/>
        {message.message}
      </div>
    )
  }

}