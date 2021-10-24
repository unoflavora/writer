import {useState} from 'react'
import ListSoal from './ListSoal'
import ListTryout from './ListTryout'

export default function List() {
  const [view, setView] = useState('Materi')
  return (
    <>
    <div className='absolute flex w-11/12 justify-end py-3 gap-3'>
      <button className={`px-5 ${view === 'Materi' ? 'bg-green-500 text-white': ''}`} onClick={() => setView('Materi')}>Materi</button>
      <button className={`px-5 ${view === 'Tryout' ? 'bg-green-500 text-white': ''}`} onClick={() => setView('Tryout')}>Tryout</button>
    </div>
      {view === 'Materi' ? <ListSoal/> : <ListTryout/>}
    </>
  )

} 