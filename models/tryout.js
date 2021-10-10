const mongoose = require('mongoose')

const tryoutSchema = new mongoose.Schema({
  kode: String,
  mataPelajaran: String,
  materi: String,
  subMateri: String,
  soal: String,
  pilihanGanda: Array,
  jawaban: String,
  pembahasan: String,
  try: Number,
  correct: Number,
  date: Date,
  kesulitan: Number,
}, {
  writeConcern: {
  j: true,
  wtimeout: 5000
}}) 

const tryoutDB =  mongoose.models.soalTryout || mongoose.model('soalTryout', tryoutSchema)

module.exports = tryoutDB