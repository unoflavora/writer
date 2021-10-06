import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

function getList() {
  const data = axios.get(`${baseUrl}/list`)
  .then((res) => {
    return res.data
  })
  .catch((e) => console.log(e))

  return data
}

function getAll(materi) {
  const data = axios.post(`${baseUrl}/all`, {
    materi
  })
  .then(function (response) {
    return(response.data)
  })
  .catch(function (error) {
    console.log(error)
  }) 

  return data
}

function getOne(param) {
  const data = axios.post(`${baseUrl}/getOne`, {
    ...param
  })
  .then(function (response) {
    return(response.data)
  })
  .catch(function (error) {
    console.log(error)
  }) 

  return data
}

function getLength(mataPelajaran,materi, subMateri) {
  const data = axios.post(`${baseUrl}/getLength`, {
    mataPelajaran,
    materi,
    subMateri
  }).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.log(error)
  })

  return data
}

async function post(soal) {
  try {
    const num = await axios.post(`${baseUrl}/kode`, {
      mataPelajaran: soal.mataPelajaran,
      materi: soal.materi
    })
      if (soal.kode.length < 4) {
        let length = await getLength(
          soal.mataPelajaran,
          soal.materi,
          soal.subMateri
        )
        length = length + 1
        const mat = soal.mataPelajaran.substring(0,3).toUpperCase()  
        soal.kode = `${mat+num.data+length}`
      }
    console.log(soal)
  } catch(e) {
    console.log(e)
  }
  return axios.post(`${baseUrl}/post`, {
    soal
  })
  .then(function (response) {
    return(response)
  })
  .catch(function (error) {
    console.log(error)
    return error
  }) 
}

function deletes(soal) {
  console.log('soal', soal)
  const data = axios.post(`${baseUrl}/post/delete`, {
    soal
  })
  .then(function (response) {
    return(response)
  })
  .catch(function (error) {
    console.log(error)
    return error
  }) 

  return data
}

const exports = {
  getList,
  getAll,
  post,
  deletes,
  getLength,
  getOne
}

export default exports