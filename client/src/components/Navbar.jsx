import { IoDocumentTextOutline } from "react-icons/io5";
import { BsFiles } from "react-icons/bs";
import Logo from './logo'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { ImCodepen } from "react-icons/im";


export default function Navbar(props) {
  const [view, setView] = useState('/')
  const [show, setShow] = useState(true)
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
          <Link to='/listTPS'>
          <li
          className={`flex ${view === '/listTPS' ? 'bg-blue-500 text-white' : ''}   justify-center items-center border-4 m-2 p-2 rounded-2xl`}>
            <ImCodepen size={40}/>
          </li>
          </Link>
        </div>
        <div className='relative justify-self-end xl:self-end flex flex-col justify-center'>
          <img 
          onClick={() => setShow(!show)}
          className='p-1 self-center xl:mb-5 xl:mr-2 border-4 w-16 h-16 rounded-full' src={props.user.picture} alt={props.user.name} />
          <button 
            className={`${show ? 'opacity-0' : 'opacity-100'} absolute transition-opacity duration-500 ease-in-out 
              -bottom-10 xl:-left-1 xl:-top-14 xl:bottom-auto px-2 bg-red-300 hover:bg-red-400 xl:mb-5 rounded-xl
               font-poppins font-semibold text-white `}
            onClick={() => props.logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      </ul>
    </nav>
  )
}