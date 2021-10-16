import { Link } from "react-router-dom"

function kesulitan(num) {
  switch(num) {
    case 0.3: return 'Mudah';
    case 0.5: return 'Sedang';
    case 1: return 'Sulit';
    default: return 'none';
  }
}

export default function Card(props) {
  const konten = props.konten
  const handleDelete = props.handleDelete
  const s = kesulitan(konten.kesulitan)
  let update = ''
  if(props.tryout) {
    update = {
      pathname: `/edit/tryout/${konten.kode}`
    }
  } else {
    update = {
      pathname: `/edit/${konten.mataPelajaran}/${konten.materi}/${konten.subMateri}/${konten.kode}`,
    }
  }

  return(
    <div className='font-poppins flex flex-col text-sm gap-5 bg-white xl:grid grid-cols-4 xl:gap-10 rounded-2xl p-4 m-5'>
      <p className='block xl:hidden font-bold px-5 text-center bg-green-400' dangerouslySetInnerHTML={{__html:konten.kode}}/>
      <div dangerouslySetInnerHTML={{__html:konten.soal}}></div>
      <ol style={{ listStyleType: "upper-alpha" }}>
        {konten.pilihanGanda.map((pg, index) => 
        <li className={`${konten.jawaban === pg ? 'bg-green-300' : ''}`} 
          key={index} 
          dangerouslySetInnerHTML={{__html:pg.replace(/<p[^>]*>/g, "")}}/>)}
      </ol>
      <div className='col-span-2 flex flex-col xl:gap-0 gap-5 xl:grid grid-cols-4 items-center'>
        <div className='col-span-3' dangerouslySetInnerHTML={{__html:konten.pembahasan}}/>
        <div className='px-10 flex flex-col items-center gap-5'>
        {konten.kesulitan ?       
          <p className={`font-bold px-4 py-1 text-center  ${s === 'Mudah'? 'bg-green-400' : s ==='Sedang' ? 'bg-yellow-400' : 'bg-red-400'}`} 
            >{s}</p>
          : null}
          <Link to={update}>
            <a href={update.pathname} className='bg-blue-500 text-white py-2 px-8 rounded-xl'>Edit</a>
          </Link>
          <button onClick={handleDelete} className='bg-red-500 text-white py-2 px-5 rounded-xl'>Delete</button>

          <p className='hidden xl:block font-bold px-5 text-center bg-green-400' dangerouslySetInnerHTML={{__html:konten.kode}}/>

        </div>
      </div>
    </div>
  )
}