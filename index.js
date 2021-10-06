var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const kode = require('./kode');
const jwt = require('./jwt')
const soal = require('./soal')

const path = require('path');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_SOAL)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/kode', kode)
app.use('/jwt', jwt)
app.use('/api', soal)


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

