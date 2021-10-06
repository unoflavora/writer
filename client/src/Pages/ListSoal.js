import Server from '../services/server'
import { useEffect, useState } from 'react'
import { BiDna, BiRocket } from "react-icons/bi";
import { GiMaterialsScience } from "react-icons/gi";
import {AiOutlineCalculator} from "react-icons/ai";
import Card from '../components/Card';
import ModalMsg from '../components/ModalMsg';

export default function ListSoal() {
  const [list, setList] = useState()
  const [matpel, setMatpel] = useState('Biologi')
  const [materi, setMateri] = useState()
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const script = document.createElement('script');

  script.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
  script.async = true;

  document.body.appendChild(script);
  document.body.removeChild(script);

  useEffect(() => {
    setLoading(true)
    async function getData() {
      const data = await Server.getAll(matpel)
      setList(data)
      setLoading(false)
    }
    getData()
  }, [matpel, modalIsOpen])

  const handleDelete = async (soal) => {
    try {
      await Server.deletes(soal)
      setMessage('Berhasil Menghapus')
      setIsOpen(true)
    } catch {
      setMessage('gagal menghapus')
      setIsOpen(true)
    }
    setTimeout(() => {
      setIsOpen(false)
    },2000)
  }

  const matpels = {
    'Biologi': <BiDna/>,
    'Fisika': <BiRocket/>,
    'Kimia': <GiMaterialsScience/>,
    'Matematika': <AiOutlineCalculator/>
  }

  return (
    <div className='col-span-15 flex flex-col p-10 bg-yellow-300 overflow-y-scroll '>
      {setIsOpen ? <ModalMsg modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} message={message}/> : null}
      <div className='xl:p-5 flex flex-col'>
        <div className='grid grid-cols-8'>
        {Object.keys(matpels).map(name => 
          <button 
          onClick={() => {setLoading(true); setMatpel(name); setMateri('')}}
          className={`clipPath row-span-1 font-poppins 
          ${matpel === name ? 'font-bold' : 'font-light bg-gray-100'} lg:text-xl xl:text-xl flex gap-2 xl:pl-4 
          py-2 items-center bg-white`}>
            {matpels[name]}
            {name}
          </button>
        )}     
        </div>
          
        <div className='flex flex-col  bg-white'>
          <div className='py-4 bg-white flex items-center'>
            <select 
              onChange={(e) => setMateri(e.target.value)}
              className='m-2 py-1 pl-5 border-2 truncate font-poppins text-lg rounded-2xl'>
              <option disabled value={''} >Pilih Materi</option>
              {loading ? 
                <option disabled>loading...</option> :
                Object.keys(list[matpel]).length === 0 ? 
                <option className='text-red-500' disabled>Tidak ada materi!</option> : 
                Object.keys(list[matpel])
                .map((materi, index) => {
                  return (
                    <option value={materi} key={index}>{materi}</option>
                  )
                })}
            </select>
          </div>
          <div className='row-span-11 bg-purple-50 text-black  '>
           {materi && !loading && list[matpel].hasOwnProperty(materi) ?
            Object.keys(list[matpel][materi]).map((subMateri) => {
              return(
                <div className='mt-3'>
                  <div className='flex justify-center items-center'>
                    <h1 className='bg-ungu-gelap text-white text-xl px-3'>{subMateri}</h1>
                  </div>
                {Object.keys(list[matpel][materi][subMateri]).map((soal) => {
                  const konten = list[matpel][materi][subMateri][soal]
                  return(
                    <Card 
                      handleDelete={() => handleDelete(konten)}                       konten={konten}/>
                  )
                })}
                </div>
              )
            }) : 
            <div>Silahkan Pilih Materi</div> 
          }
          </div>
        </div>
      </div>
    </div>
  )
}