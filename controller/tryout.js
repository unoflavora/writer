const router = require('express').Router();
const SoalDB = require('../models/newTryout')
const soal80 = require('./to')
const TPS = {
  'Kemampuan Penalaran Umum': 'KPU',
  'Pengetahuan Kuantitatif': 'PK',
  'Pengetahuan dan Pemahaman Umum': 'PPU',
  'Kemampuan Memahami Bacaan dan Menulis': 'KBM'
}

router.post('/all', (request, response) => {
  const matpel = request.body.matpel
  SoalDB.find({'mataPelajaran': matpel}).then((res) => {
    response.status(200).json(res)
  }).catch((e) => {
    console.log(e)
    response.status(400).json(e)
  })
})

function encrypt(text, shift) {
  let result = "";

  //loop through each caharacter in the text
  for (let i = 0; i < text.length; i++) {
        
      //get the character code of each letter
      let c = text.charCodeAt(i);

      // handle uppercase letters
      if(c >= 65 && c <=  90) {
          result += String.fromCharCode((c - 65 + shift) % 26 + 65); 

      // handle lowercase letters
      } else if(c >= 97 && c <= 122){
          result += String.fromCharCode((c - 97 + shift) % 26 + 97);

      // its not a letter, let it through
      } else {
          result += text.charAt(i);
      }
  }
  return result;
}

function decrypt(text,shift){
  let result = "";
  shift = (26 - shift) % 26;
  result = encrypt(text,shift);
  return result;
}  


router.post('/updateDB', async (request, response) => {
  try {
    // const semuaSoalTO = await SoalDB.find({})
    const semuaSoalTO = soal80
    for(const soal of semuaSoalTO) {
      const soalBaru = {...soal, 
        jawaban: decrypt(soal.jawaban, 10),
        try:0,
        correct:0,
        date: new Date(),
        review: {
          skor: 0,
          total:0,
          alasan:[]
      }}
      console.log(soalBaru)
      const updatedSoal = new SoalDB({...soalBaru})
      await updatedSoal.save()
    }
    const newTO = await SoalDB.find({})
    console.log(newTO.length)
    response.status(200).json(newTO)
  } catch(e) {
    response.status(400).json(e)
    console.log(e)
  }
})

router.delete('/updateDB', async (request, response) => {
  try {
    await SoalDB.deleteMany({})
    const newTO = await SoalDB.find({})
    response.status(200).json(newTO)
  } catch(e) {
    response.status(400).json(e)
    console.log(e)
  }
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
  let soal = request.body.soal
  let exist = await SoalDB.exists({kode:soal.kode})
  if (exist) {
    SoalDB.findOneAndUpdate({kode:soal.kode}, soal).then(res => {
      response.status(200).json(res)
    }).catch(e => response.status(400).json(e))
  } else {
    try {
      let allMatpel = await SoalDB.find({'mataPelajaran': soal.mataPelajaran})
      const mat = 
          Object.keys(TPS).includes(soal.mataPelajaran) ?
          TPS[soal.mataPelajaran]
          : soal.mataPelajaran.substring(0,3).toUpperCase()  
      
      let code = `${mat}TO${allMatpel.length + 1}`
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

