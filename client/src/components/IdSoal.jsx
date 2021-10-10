export default function IdSoal({allData, setAllData, mataPelajaran}) {
  return(
    <div className='text-base font-poppins font-semibold grid gap-5 bg-gray-100 p-7'>
    <div className='flex flex-col'>
    <label for='mataPelajaran '>MATA PELAJARAN</label>
    <select
    onChange={(event) => setAllData({...allData, mataPelajaran:event.target.value, subMateri:'', materi: ''})}
    value={allData.mataPelajaran}
    className='py-3 rounded-lg' name='mataPelajaran' id='mataPelajaran'
    >
      {Object.keys(mataPelajaran).map(matpel => 
        <option key={matpel} value={matpel}>{matpel}</option>)}
    </select>
    </div>
    
    <div className='grid grid-cols-2 gap-3'>
      <div className='flex flex-col'>
        <label for='materi'>Materi</label>
        <select
        value={allData.materi}
        onChange={(event) => setAllData({...allData, materi:event.target.value, subMateri: ''})} 
        name='materi' id='materi' className='py-2 rounded-lg'>
          <option value='' disabled>Pilih materi</option>
          {Object.keys(mataPelajaran[allData.mataPelajaran]).length > 0 ?
          Object.keys(mataPelajaran[allData.mataPelajaran]).map((materi) =>
          <option key={materi} value={materi}>{materi}</option>)
          : <option disabled></option>}
          <option key='pilih' value={'add'}>tambah materi...</option>
        </select>
      </div>
      

      <div className='flex flex-col'>
        <label for='materi'>Sub-Materi</label>
        <select
        disabled={!Object.keys(mataPelajaran[allData.mataPelajaran]).includes(allData.materi)}
        value={allData.subMateri}
        onChange={(event) => setAllData({...allData, subMateri:event.target.value})} 
        name='subMateri' id='subMateri' className='py-2 rounded-lg'>
          <option className='text-gray-500' value={''}>Pilih subMateri...</option>
          {allData.materi !== 'add' && Object.keys(mataPelajaran[allData.mataPelajaran]).includes(allData.materi) ?
          mataPelajaran[allData.mataPelajaran][allData.materi].map((subMateri, index) =>
          <option key={subMateri} value={subMateri}>{subMateri}</option>)
          :
            <option disabled> </option>
         }
          <option key='pilih' value={'addSub'}>tambah subMateri...</option>        
        </select>
      </div>
    </div>
    </div>
  )
  
  
}