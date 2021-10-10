export default function PreviewPG({allData, setAllData}) {
  return(
    <div className='grid grid-cols-1 grid-flow-row gap-4 '>
      {allData.pilihanGanda.map((pg, index) => {
      const abjad = ['A', 'B', 'C', 'D', 'E']
      return (
      <label className='break-words' key={index}>
      <div 
        className={`break-words grid grid-cols-12 gap-5 items-center border-4 rounded-md 
        font-poppins text-ungu-teks
        ${allData.jawaban === pg ? 'bg-green-300' : 'bg-white'}`}>

        <button 
          className='col-span-11 grid grid-cols-12 gap-5 '
          onClick={() => {
          setAllData({...allData, jawaban:pg})
        }}>
          <p className='col-span-1 bg-gray-200 h-full text-lg font-semibold flex items-center justify-center '>{abjad[index]}</p>

          <div 
            className={`break-words text-base text-left flex items-center h-full w-full col-span-11`}
            dangerouslySetInnerHTML={{__html:pg}}>
          </div>
        </button>

        <div className='bg-red-200 font-poppins font-bold h-full'>
          <button
            className='h-full w-full text-lg font-semibold'
            onClick={(event) => {
            event.preventDefault()
            setAllData({...allData, 
            pilihanGanda:allData.pilihanGanda.filter((ipg) => ipg !== pg)})}}>
              X
          </button>
        </div>

      </div>
      </label>        
      )
    })}
    </div>    
  )
}