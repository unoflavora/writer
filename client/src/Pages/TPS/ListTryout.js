import Server from '../../services/tryout'
import { useEffect, useState } from 'react'
import { GiBrain, GiClassicalKnowledge } from 'react-icons/gi';
import { AiFillCalculator, AiOutlineBook} from 'react-icons/ai';
import Card from '../../components/Card';
import ModalMsg from '../../components/ModalMsg';

export default function ListSoal() {
  const [matpel, setMatpel] = useState('Kemampuan Penalaran Umum')
  const [materi, setMateri] = useState()
  const [list, setList] = useState([])
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
      console.log(data)
      setList(data)
      setLoading(false)
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    'Kemampuan Penalaran Umum': <GiBrain/>,
    'Pengetahuan Kuantitatif': <AiFillCalculator/>,
    'Pengetahuan dan Pemahaman Umum': <GiClassicalKnowledge/>,
    'Kemampuan Memahami Bacaan dan Menulis': <AiOutlineBook/>
  }


  return (
    <div className='col-span-15 flex flex-col p-5 bg-yellow-300 overflow-y-scroll '>
      {setIsOpen ? <ModalMsg modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} message={message}/> : null}
      <div className='xl:p-5 flex flex-col'>
        <div className='grid grid-cols-4'>
        {Object.keys(matpels).map(name => 
          <button 
          onClick={() => {setLoading(true); setMatpel(name); setMateri('')}}
          className={`clipPath row-span-1 font-poppins 
          ${matpel === name ? 'font-bold' : 'font-light bg-gray-100'} flex gap-2 xl:pl-4 
          py-2 items-center bg-white text-sm`}>
            {matpels[name]}
            {name}
          </button>
        )}     
        </div>
          
        <div className='flex flex-col  bg-white'>
          <div className='py-4 bg-white flex items-center'>
            <select 
              onChange={(e) => setMateri(e.target.value)}
              className='m-2 py-1 pl-5 border-2 truncate font-poppins text-base rounded-2xl'>
              <option value={''} >Pilih Materi</option>
              {loading ? 
                <option disabled>loading...</option> :
                list ?
                  list.length < 1 ? 
                  <option className='text-red-500' disabled>Tidak ada materi!</option> : 
                  list.map((soal) => {
                    console.log(soal)
                    if(soal.materi) {
                      return ( 
                        soal.materi
                      )
                    } else {
                      return null
                    }}).filter((value, index, self) => self.indexOf(value) === index)
                    .map((mat, index) =>  {
                      if(mat) {
                        return (
                          <option value={mat} key={index}>{mat}</option>
                        )
                      } else {
                        return null
                      }
                    })
                    : <option disabled>loading...</option>}
            </select>
          </div>
          <div className='row-span-11 bg-purple-50 text-black  '>
           {materi && !loading && list ?
            list.filter((soal) => soal.materi === materi).map((konten) => {
              return <Card handleDelete={() => handleDelete(konten)}
               konten={konten}
               tryout/> 
            }) : 
              <div>Silahkan Pilih Materi</div> 
            }
          </div>
        </div>
      </div>
    </div>
  )
}