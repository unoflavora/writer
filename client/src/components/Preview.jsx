export default function Preview({konten, setView, view}) {
  return (
    <div className='flex flex-col'>
    <div className='flex self-end gap-5'>
      <button className={`${view === 'Soal' || view === 'Pilihan Ganda' ? 'border-b-2 border-ungu-terang font-bold' : ''} text-lg py-1 px-7 font-semibold`} onClick={() => {setView('Soal')}}>Soal</button>
      <button className={`${view === 'Pembahasan' ?'border-b-2 border-ungu-terang font-bold' :''} text-lg py-1 px-7 font-semibold`} onClick={() => {setView('Pembahasan')}}>Pembahasan</button>
    </div>
    <div>
      <div className={`${view === 'Soal' || view === 'Pilihan Ganda' ? 'block' :'hidden'} break-words each-slide`} key={konten.kode}>
        <h1 className='text-md font-semibold'>{konten.materi}-{konten.subMateri}</h1>
          <div className='bg-ungu-terang px-5 py-8 w-full rounded-md'>
            <div className='inline-block w-full
                text-lg font-poppins font-semibold text-ungu-gelap' 
            dangerouslySetInnerHTML={{__html:konten.soal}}/>
        </div>
      </div>
      <div className={`${view === 'Pembahasan' ? 'block' :'hidden'} break-words each-slide`} key={konten.kode}>
      <h1 className='text-md font-semibold'>{konten.materi}-{konten.subMateri}</h1>
        <div className='bg-ungu-terang px-5 py-8 w-full rounded-md'>
          <div className='inline-block
            	text-lg font-poppins font-semibold text-ungu-gelap' 
          dangerouslySetInnerHTML={{__html:konten.pembahasan}}/>
        </div>
      </div>
    </div>
    </div>
  )
}