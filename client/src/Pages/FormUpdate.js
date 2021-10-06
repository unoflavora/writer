import Preview from "../components/Preview";
import PreviewPG from "../components/PreviewPG";
import IdSoal from "../components/IdSoal";
import Editor from "../components/Editor";
import Status from "../components/Status";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import Server from '../services/server'

export default function FormSoal({
  allData, setAllData, handleSubmit, mataPelajaran, view, editView, 
  setPG, setTipePG, tipePG, addPG, message, match
}){

  const [fetch, setFetch] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function get() {
      const data = await Server.getOne({...match.params})
      setFetch({...data})
      setAllData({...data})
      setLoading(false)
    }
    get()
  }, [match.path])

  useEffect(() => {
    document.getElementById('soal-editor')
  }, [])

  if(loading) {
    return <div className='flex justify-center items-center text-xl font-bold font-poppins w-screen h-screen'>
      Loading...
    </div>
  }

  return (
    <>
      <div className='col-span-8 bg-yellow-300 p-4 lg:p-24'>
              <Preview konten={{...allData}}/>
              <div className='py-5'>
                <PreviewPG allData={{...allData}} setAllData={setAllData}/>
              </div>
            </div>
            <form onSubmit={handleSubmit} className='col-span-7 lg:col-span-7 flex flex-col text-lg'>
              <IdSoal setAllData={setAllData} allData={allData} mataPelajaran={mataPelajaran}/>
 
              <div className='flex justify-between mx-7 pt-7 '>
                {['Soal', 'Pilihan Ganda', 'Pembahasan'].map(item =>
                    <button
                    className={`flex font-poppins py-1 w-full justify-center border-b-4 border-gray-100 ${view === item ? 'border-green-300': ''}`}
                    onClick={(event) => {event.preventDefault(); editView(item)}}>{item}</button>
                )}
              </div>
              <div className={`${view === 'Soal'? 'block':'hidden'} p-7`}>
                <Editor
                  id='soal-editor'
                  initialValue={fetch.soal} 
                  onEditorChange={(value) => setAllData({...allData, soal:value})}
                />
              </div>
              <div className={`${view === 'Pilihan Ganda'? 'block':'hidden'} p-7`}>
                <Editor 
                  onEditorChange={(value) => setPG(value)}
                />
                <div className='flex justify-between'>
                  <button className='font-poppins font-extrabold text-3xl px-4 bg-green-500 text-white' onClick={(event) => {event.preventDefault(); addPG()}}>+</button>
                  <div className='flex'>
                    <label 
                      onClick={() => setTipePG('pg')}
                      className={`${tipePG==='pg'? 'bg-blue-300' : '' } 
                      flex
                      items-center gap-2 
                      px-5 py-3 text-xl`} for='pg'>
                      <input type='radio' id='pg' name='tipe'/>
                      Pilihan Ganda
                    </label>
                    <label 
                      onClick={() => setTipePG('sebab')}
                      className={`${tipePG==='sebab'? 'bg-blue-300' : '' } 
                      flex
                      items-center gap-2 
                      px-5 py-3 text-xl`} for='sebab'>
                      <input type='radio' id='sebab' name='tipe'/>
                      Sebab-Akibat
                    </label>
                    <label onClick={() => setTipePG('benar')}
                      className={`${tipePG==='benar'? 'bg-blue-300' : '' } 
                      flex
                      items-center gap-2 
                      px-5 py-3 text-xl`} for='benar'>
                      <input type='radio' id='benar' name='tipe'/>
                      Benar-Salah
                    </label>
                  </div>
                </div>
                
              </div>
              <div className={`${view === 'Pembahasan'? 'block':'hidden'} p-7`}>
                <Editor 
                  initialValue={fetch.pembahasan}
                  onEditorChange={(value) => setAllData({...allData, pembahasan:value})}
                />
              </div>
              <Status/>
              {message.error || message.success ?
                <Message message={message}/>: null}
            </form>
    </>
  )
}