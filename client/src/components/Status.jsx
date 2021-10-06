export default function Status(props) {
  return (
    <div className='font-poppins flex flex-col gap-3 py-5 px-7'>
    <h1 className='text-gray-500 text-xl'>Status Soal :</h1>
    {props.published ?
      <div className='flex items-center gap-5 pl-1'>
        <div className='flex items-center gap-5'>
          <span className='rounded-full w-3 h-3 bg-green-300'/>
          <p className='font-semibold'>Published</p>
        </div>
        <button className='py-2 px-14 bg-green-400 hover:bg-green-500 text-white rounded-lg' type='submit'>Update</button>
      </div>
    :
      <div className='flex items-center gap-5 pl-1'>
        <div className='flex items-center gap-5'>
          <span className='rounded-full w-3 h-3 bg-yellow-300'/>
          <p className='font-semibold'>Unpublished</p>
        </div>
        <button type='submit' className='py-2 px-10 xl:px-14 bg-green-400 hover:bg-green-500 text-white rounded-lg'>Submit</button>
      </div>
    }    
    </div>
  )
}