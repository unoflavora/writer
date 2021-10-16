import Preview from "../components/Preview";
import PreviewPG from "../components/PreviewPG";
import IdSoal from "../components/IdSoal";
import Editor from "../components/Editor";
import Status from "../components/Status";
import Message from "../components/Message";
import { useEffect } from "react";

export default function FormSoal({
  allData, setAllData, handleSubmit, mataPelajaran, view, editView, 
  setPG, setTipePG, tipePG, addPG, message, uploading
}){

  useEffect(() => {
    setAllData({
      kode: '',
      mataPelajaran: 'Biologi',
      materi: '',
      subMateri: '',
      soal: '',
      tipeJawaban:'',
      pilihanGanda: [],
      jawaban: '',
      pembahasan:'',
      try: 0,
      correct: 0
    })
  }, [])

  return (
    <>
      <div className='col-span-8 bg-yellow-300 p-4 lg:p-12 overflow-y-scroll'>
              <Preview konten={{...allData}} setView={editView} view={view}/>
              <div className='py-5'>
                <PreviewPG allData={{...allData}} setAllData={setAllData}/>
              </div>
            </div>
            <form onSubmit={handleSubmit} className='col-span-7 lg:col-span-7 flex flex-col'>
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
                  value={allData.soal} 
                  onEditorChange={(value) => setAllData({...allData, soal:value})}
                />
              </div>
              <div className={`${view === 'Pilihan Ganda'? 'block':'hidden'} p-7`}>
                <Editor 
                  onEditorChange={(value) => setPG(value)}
                />
                <div className='flex justify-between'>
                  <button className='font-poppins font-extrabold text-xl px-4 bg-green-500 text-white' onClick={(event) => {event.preventDefault(); addPG()}}>+</button>
                  <div className='flex'>
                    <label 
                      onClick={() => setTipePG('pg')}
                      className={`${tipePG==='pg'? 'bg-blue-300' : '' } 
                      flex
                      items-center gap-2 
                      px-5 py-3 text-base`} for='pg'>
                      <input type='radio' id='pg' name='tipe'/>
                      Pilihan Ganda
                    </label>
                    <label 
                      onClick={() => setTipePG('sebab')}
                      className={`${tipePG==='sebab'? 'bg-blue-300' : '' } 
                      flex
                      items-center gap-2 
                      px-5 py-3 `} for='sebab'>
                      <input type='radio' id='sebab' name='tipe'/>
                      Sebab-Akibat
                    </label>
                    <label onClick={() => setTipePG('benar')}
                      className={`${tipePG==='benar'? 'bg-blue-300' : '' } 
                      flex
                      items-center gap-2 
                      px-5 py-3`} for='benar'>
                      <input type='radio' id='benar' name='tipe'/>
                      Benar-Salah
                    </label>
                  </div>
                </div>
                
              </div>
              <div className={`${view === 'Pembahasan'? 'block':'hidden'} p-7`}>
                  <Editor 
                    value={allData.pembahasan}
                    onEditorChange={(value) => setAllData({...allData, pembahasan:value})}
                  />
                </div>
              <div className='flex flex-col gap-5 justify-between xl:flex-row'>
                {allData.date ? <Status published uploading={uploading}/> : <Status uploading={uploading}/>}
                {message.error || message.success ?
                  <Message message={message}/>: null}
                <div className='flex lg:gap-10'>
                {allData.tryout ? 
                  <select
                    className='border-2 py-2 rounded-lg'
                    value={allData.kesulitan}
                    onChange={(event) => setAllData({...allData, kesulitan:event.target.value})} 
                    name='kesulitan' id='kesulitan'>                 
                    <option value='' default>Kesulitan</option>
                    <option value='1'>Sulit</option>
                    <option value='0.5'>Sedang</option>
                    <option value='0.3'>Mudah</option>
                  </select>
                 : null}
                 <button type='button' 
                  className={`w-1/4 mr-7 mb-5 py-2 lg:py-0 lg:mb-0 lg:w-24 flex self-end justify-center text-white font-poppins items-center h-full rounded-xl ${allData.tryout? 'bg-yellow-500' : 'bg-blue-500'} px-4`}
                  onClick={() => setAllData({...allData, tryout:!allData.tryout})}>
                  {allData.tryout? 'TO' : 'MATERI'}
                </button>
                </div>
                
              </div>
            </form>
    </>
  )
}