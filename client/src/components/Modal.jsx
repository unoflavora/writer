import Modal from 'react-modal';
import {useState} from 'react'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default function Modals({allData, addMateri, setAllData, modalIsOpen, setIsOpen}) {
  const [materi, setMateri] = useState({
    kode: '',
    nama: ''
  })

  function closeModal() {
    setIsOpen(false);
  }


  function handleSubmit(event) {
    event.preventDefault()
    if(materi.nama.length > 1) {
      setAllData({...allData, materi:materi.nama, kode:materi.kode})
      addMateri(materi.nama)
    } 
    setIsOpen(false)
    setMateri({
      kode: '',
      nama: ''
    })
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>Tutup</button>
        <div class='flex flex-col gap-6 justify-center items-center font-poppins text-xl'>
          <h1>Masukkan Materi di '{allData.mataPelajaran}'</h1>
        <form onSubmit={handleSubmit} className='flex gap-4 flex-col text-lg '>
          <div className='flex gap-4 justify-between items-center'>
            <label for='materi'>Materi</label>
            <input id='materi' onChange={(event) => setMateri({...materi, nama:event.target.value})} className='border-2 border-black py-2 w-96' type='text'/>
          </div>
          <button className='p-2 px-5 rounded-xl bg-green-500 text-white' type='submit'>Tambah Materi</button>
        </form>
        </div>
      </Modal>
    </div>
  )
}