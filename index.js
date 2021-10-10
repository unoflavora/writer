var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const kode = require('./controller/kode');
const jwt = require('./controller/jwt')
const soal = require('./controller/soal')
const tryout = require('./controller/tryout')

const path = require('path');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_SOAL)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/kode', kode)
app.use('/api/jwt', jwt)
app.use('/api/tryout', tryout)
app.use('/api', soal)


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

