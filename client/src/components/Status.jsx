export default function Status(props) {
  return (
    <div className='font-poppins flex items-center gap-3 px-7'>
    {props.uploading ?
      <div className='flex items-center gap-5 pl-1'>
        <div className='flex items-center gap-5'>
          <span className='rounded-full w-3 h-3 bg-yellow-300'/>
          <p className='font-semibold'>Uploading...</p>
        </div>
        <button className='py-2 px-14 bg-green-400 hover:bg-green-500 text-white rounded-lg' type='submit'>Update</button>
      </div>
    :
      <div className='flex items-center gap-5 pl-1'>
        <div className='flex items-center gap-5'>
          <span className='rounded-full w-3 h-3 bg-green-300'/>
          <p className='font-semibold'>Editing</p>
        </div>
        <button type='submit' className='py-2 px-10 bg-green-400 hover:bg-green-500 text-white rounded-lg'>Submit</button>
      </div>
    }    
    </div>
  )
}