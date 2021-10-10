import axios from 'axios'

const baseUrl = '/api/tryout'

function getAll(matpel) {
  const data = axios.post(`${baseUrl}/all`, {
    matpel
  })
  .then((res) => {
    return res.data
  })
  .catch((e) => console.log(e))

  return data
}

function getSoal(param) {
  console.log('servesr', param)
  const data = axios.post(`${baseUrl}/soal`, {
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

function getMateri(param) {
  const data = axios.post(`${baseUrl}/materi`, {
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

function getSoalPerMateri(param) {
  const data = axios.post(`${baseUrl}/soalMateri`, {
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

async function post(soal) {
  console.log('server', soal)
   return axios.post(`${baseUrl}/submit`, {
    soal
  })
  .then(function (response) {
    return(response.data)
  })
  .catch(function (error) {
    console.log(error)
    return error
  }) 
}

function deletes(soal) {
  console.log('soal', soal)
  const data = axios.post(`${baseUrl}/delete`, {
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
  getAll,
  post,
  deletes,
  getSoal,
  getSoalPerMateri,
  getMateri
}

export default exports