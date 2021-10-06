var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const SoalDB = require('./models/matpel')
const kode = require('./kode');
const jwt = require('./jwt')
const path = require('path');

require('dotenv').config()

mongoose.connect(process.env.MONGODB_SOAL)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use('/kode', kode)
app.use('/jwt', jwt)

app.post('/all', (request, response) => {
  const body = request.body
  const result = {}
  SoalDB.find({'mataPelajaran': body.materi}).then(res => {
    res.map((matpel) => {
        const dataMatpel = matpel['materi']
        result[matpel.mataPelajaran] = dataMatpel
    })
  response.status(200).json(result)  
  }).catch(e => {
    response.status(401).json(e)
    console.log(e)
  })
})

app.post('/post', (request, response) => {
  const soal = {...request.body.soal,
    date: new Date(),
    try: 0,
    correct: 0
  }

  SoalDB.findOne({'mataPelajaran': soal.mataPelajaran}).then(res => {
      soal.materi = soal.materi.trim()
      soal.subMateri = soal.subMateri.trim()
      let matpel = res['materi']
      try {
        matpel[soal.materi]
        try {
          matpel[soal.materi][soal.subMateri][soal.kode] = soal
        } catch {
          matpel[soal.materi][soal.subMateri] = {}
          matpel[soal.materi][soal.subMateri][soal.kode] = soal
        }
      } catch {
        matpel[soal.materi] = {}
        matpel[soal.materi][soal.subMateri] = {}
        matpel[soal.materi][soal.subMateri][soal.kode] = soal
      }
      SoalDB.findOneAndUpdate({'mataPelajaran': soal.mataPelajaran}, {'materi':matpel}, {
        returnOriginal: false
      })
      .then(res => response.status(200).json(res))
      .catch(e => {
        console.log(e)
        response.status(400).json(e) 
      })
  })
  .catch(e => {
    console.log(e)
    response.status(400).json(e)
  })
})

app.post('/getOne', (request, response) => {
  const konten = request.body
  try {
    SoalDB.findOne({'mataPelajaran': konten.matpel}).then(res => {
      console.log(res)
      const data = res['materi'][konten.materi][konten.subMateri][konten.kode]
      response.status(200).json(data)
    }).catch(e => {
      console.log(e)
      response.status(500).send('materi/submateri/kode not found')
    })
  } catch(e) {
    console.log(e)
    response.status(500).send('matpel not found')
  }
})

app.post('/getLength', (request, response) => {
  const body = request.body
  SoalDB.findOne({'mataPelajaran': body.mataPelajaran}).then(res => {
    let matpel = res['materi']
    let number = 0
    try {
      Object.keys(matpel[body.materi]).map((subMateri) => {
        Object.keys(matpel[body.materi][subMateri]).map((a) => {
          number = number + 1
        })
      })
      response.status(200).json(number)
    } catch(e) {
      response.status(200).json(0)
    }
  })
})


app.post('/post/delete', (request, response) => {
  const soal = request.body.soal
  SoalDB.findOne({'mataPelajaran': soal.mataPelajaran}).then(res => {
    let matpel = res['materi']
    try {
      delete matpel[soal.materi][soal.subMateri][soal.kode]
      SoalDB.findOneAndUpdate({'mataPelajaran': soal.mataPelajaran}, {'materi':matpel}, {
        returnOriginal: false
      }).then(() => {
        response.status(200).json('Berhasil!')
      })
    } catch {
      response.status(400).json('Gagal Menghapus')
    }
  })
})

app.get('/list', (request, response) => {
    const result = {}
    SoalDB.find().then(res => {
    res.map((matpel) => {
        const dataMatpel = matpel['materi']
        const materi = Object.keys(dataMatpel)
        let finalData = {}
        if(materi.length > 0) {
          materi.map(materi => {
            finalData[materi] = Object.keys(dataMatpel[materi])
          })
        }
        result[matpel.mataPelajaran] = finalData
      })
      response.status(200).json(result)  
    }).catch(e => {
      response.status(401).json(e)
      console.log(e)
    })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

