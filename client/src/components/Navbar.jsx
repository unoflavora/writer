import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiles } from "react-icons/bs";
import Logo from './logo'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

export default function Navbar(props) {
  const [view, setView] = useState('/')
  const location = useLocation()

  useEffect(() => {
    setView(location.pathname)
  }, [location.pathname])

  return(
    <nav className='px-1 grid grid-rows-1 xl:grid-rows-2'>
      <ul className='flex gap-3 xl:grid grid-cols-2  xl:h-screen xl:grid-cols-1 xl:grid-rows-2'>
        <div className='flex my-1 xl:my-0 xl:flex-col'>
          <li className='flex justify-center items-center xl:my-5  xl:border-b-4 xl:pb-3'>
            <Logo width={70}/>
          </li>
          <Link to='/'>
          <li
          className={`flex ${view === '/' ? 'bg-blue-500 text-white' : ''}   justify-center items-center border-4 m-2 p-2 rounded-2xl`}>
            <IoDocumentTextOutline size={40}/>
          </li>
          </Link>
          <Link to='/list'>
          <li
          className={`flex ${view === '/list' ? 'bg-blue-500 text-white' : ''}   justify-center items-center border-4 m-2 p-2 rounded-2xl`}>
          <BsFiles size={40}/>
          </li>
          </Link>
        </div>
        <div className='justify-self-end self-center xl:self-end xl:mb-5 border-4 w-16 xl:w-20 h-16 xl:h-20 rounded-full'>
          
        </div>
      </ul>
    </nav>
  )
}