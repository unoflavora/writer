import React, { useState, useEffect } from 'react';
import Server from './services/server';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Modal from './components/Modal';
import ModalSub from './components/ModalSub'
import Navbar from './components/Navbar';
import ListSoal from './Pages/ListSoal';
import tipeSoal from './services/tipeSoal';
import FormSoal from './Pages/FormSoal';
import FormUpdate from './Pages/FormUpdate'

function App() {
  const [PG, setPG] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenSub, setIsOpenSub] = useState(false);
  const [view, setView] = useState('Soal')
  const [tipePG, setTipePG] = useState('pg')
  const [mataPelajaran, setMataPelajaran] = useState({
    Biologi:{},
    Fisika:{},
    Kimia:{},
    Matematika:{},
    Ekonomi:{}, 
    Geografi:{},
    Sosiologi:{},
    Sejarah:{}
  })  
  const [allData, setAllData] = useState({
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
  const [message, setMessage] = useState({
    message: '',
    error: false,
    success: false,
  })

  useEffect(() => {
    async function list() {
      const data = await Server.getList()
      setMataPelajaran({...data})
    }
    list()
  }, [])

  useEffect(() => {
    setAllData({...allData, pilihanGanda:tipeSoal[tipePG]})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipePG])



  const script = document.createElement('script');

  script.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
  script.async = true;

  document.body.appendChild(script);
  document.body.removeChild(script);

  useEffect(() => {
    if (allData.materi === "add") {
      setIsOpen(true)
    } else {
      console.log(allData.materi)
    }
   }, [allData.materi])

  useEffect(() => {
    setAllData({...allData, materi: ''})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData.mataPelajaran])

  useEffect(() => {
   if (allData.subMateri === "addSub") {
    setIsOpenSub(true)
    } else {
    console.log(allData.subMateri)
  }}, [allData.subMateri])

  const addMateri = (materi) => {
    const obj = {...mataPelajaran}
    obj[allData.mataPelajaran][materi] = []
    setMataPelajaran(obj)
  }

  const addsubMateri = (subMateri) => {
    const obj = {...mataPelajaran}
    obj[allData.mataPelajaran][allData.materi].push(subMateri)
    setMataPelajaran(obj)
  }

  const addPG = () => {
    const newPG = [...allData.pilihanGanda]
    newPG.push(PG)
    setAllData({...allData, pilihanGanda:newPG})
  }

  const editView = (view) => {
    setView(view)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (!allData.mataPelajaran) {
        setMessage({
          message: 'Silahkan pilih mata pelajaran dahulu!',
          success: false,
          error: true
        })
      } else if (allData.materi.length < 1) {
        setMessage({
          message: 'Silahkan pilih materi dahulu!',
          success: false,
          error: true
        })
      } else if(allData.subMateri.length < 1) {
        setMessage({
          message: 'Silahkan pilih sub-materi dahulu!',
          success: false,
          error: true
        })
      } else {
        try {
          await Server.post(allData)      
          setMessage({
            message: 'Berhasil mensubmit!',
            success: true,
            error: false
          })
          setAllData({...allData,
            kode: '',
            soal: '',
            tipeJawaban:'',
            pilihanGanda: [],
            jawaban: '',
            pembahasan:'',
            try: 0,
            correct: 0
          })
        } catch(e) {
          console.log(e)
          setMessage({
            message: 'Gagal mengakses server',
            success: false,
            error: true
          })
        }

      }
    } catch(e) {
      setMessage({
        message: 'Something goes wrong!',
        success: false,
        error: true
      })
    }
    setTimeout( () => {
      setMessage({
        message: '',
        success: false,
        error: false
      })
    }, 5000)
  }

  return (
    <Router>
      <div className='xl:overflow-y-hidden'>
        <Modal 
          setAllData={setAllData} 
          setIsOpen={setIsOpen} 
          allData={allData}
          modalIsOpen={modalIsOpen}
          addMateri={addMateri}
        />
        <ModalSub
          setAllData={setAllData} 
          setIsOpen={setIsOpenSub} 
          allData={allData}
          modalIsOpen={modalIsOpenSub}
          addsubMateri={addsubMateri}
        />
      <div className='grid-rows-2 xl:grid lg:grid-cols-16 lg:grid-rows-1 h-screen '>
        <div className='bg-gray-50 col-span-1 flex justify-center'>
          <Navbar/>
        </div>
        <Switch>
          <Route path='/list'>
            <ListSoal/>
          </Route>
          <Route path='/edit/:matpel/:materi/:subMateri/:kode'
            render={(props) =>
            <FormUpdate 
              {...props}
              allData = {allData}
              mataPelajaran = {mataPelajaran} 
              view = {view} 
              message = {message}
              tipePG = {tipePG} 
              addPG = {addPG} 
              setAllData = {setAllData}
              handleSubmit = {handleSubmit} 
              editView = {editView}
              setPG = {setPG}
              setTipePG = {setTipePG}
            />}
          />
            
          <Route exact path='/'>
            <FormSoal 
              allData = {allData}
              mataPelajaran = {mataPelajaran} 
              view = {view} 
              message = {message}
              tipePG = {tipePG} 
              addPG = {addPG} 
              setAllData = {setAllData}
              handleSubmit = {handleSubmit} 
              editView = {editView}
              setPG = {setPG}
              setTipePG = {setTipePG}
            />
          </Route>         
        </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App