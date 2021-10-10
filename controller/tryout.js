const router = require('express').Router();
const SoalDB = require('../models/tryout')

router.post('/all', (request, response) => {
  const matpel = request.body.matpel
  SoalDB.find({'mataPelajaran': matpel}).then((res) => {
    response.status(200).json(res)
  }).catch((e) => {
    console.log(e)
    response.status(400).json(e)
  })
})


router.post('/soal', async (request, response) => {
  const kode = request.body.kode
  try {
    const soal = await SoalDB.findOne({'kode': kode})
    if(soal) {
      response.status(200).json(soal)
    } else {
      response.status(400).json('not found')
    }
  } catch(e) {
    response.status(400).json(e)
  }
})

router.post('/submit', async (request, response) => {
  let exist = await SoalDB.exists({kode:soal.kode})
  if (exist) {
    SoalDB.findOneAndUpdate({kode:soal.kode}, soal).then(res => {
      response.status(200).json(res)
    }).catch(e => response.status(400).json(e))
  } else {
    try {
      let allMatpel = await SoalDB.find({'mataPelajaran': soal.mataPelajaran})
      let code = `${soal.mataPelajaran.substring(0,3).toUpperCase()}TO${allMatpel.length + 1}`
      const soalBaru = new SoalDB({...soal, kode: code})
      soalBaru.save()
      response.status(200).json(soalBaru)  
    } catch(e) {
      console.log(e)
      response.status(400).json(e.message)
    }
  }
})

router.post('/delete', (request, response) => {
  const soal = request.body.soal
  SoalDB.findOneAndDelete({'kode': soal.kode}).then((res) => {
    if(res) {
      response.status(200).json('Berhasil!')
    } else {
      response.status(400).json('Not Found')
    }
  }).catch(function(e) { 
    console.log(e)
    response.status(400).json('Gagal Menghapus')
  })
})

module.exports = router

