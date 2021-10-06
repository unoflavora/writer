import Modal from 'react-modal';

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


export default function ModalMsg({modalIsOpen, setIsOpen, message}) {

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button className='border-b-4 w-full flex justify-end pb-2 text-xl'  onClick={closeModal}>Tutup (X)</button>
        <div class='p-5 flex flex-col gap-6 justify-center items-center font-poppins text-xl'>      
          {message}
        </div>
      </Modal>
    </div>
  )
}