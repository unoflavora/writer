const router = require('express').Router()
const KodeDB = require('../models/kode')

router.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  try {
    const res = await KodeDB.findOne({mataPelajaran:body.mataPelajaran})
    if (res.materi.hasOwnProperty(body.materi)) {
      console.log('ketemu', res.materi[body.materi])
      response.status(200).json(res.materi[body.materi])
    } else {
      const num = 65 + Object.keys(res.materi).length
      res.materi[body.materi] = String.fromCharCode(num)
      try {
        const newMateri = {...res.materi}
        await KodeDB.findOneAndUpdate({mataPelajaran:body.mataPelajaran},
        {materi:newMateri})
        response.status(200).json(res.materi[body.materi])
      } catch(e) {
        console.log(e)
        response.status(400).json(e)    
      }      
    }
  } catch(e) {
    console.log(e)
    response.status(400).json(e)
  }
})

module.exports = router
   