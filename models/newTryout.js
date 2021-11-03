const mongoose = require('mongoose')

let reviewSchema = new mongoose.Schema({
  skor: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default:0
  },
  alasan: {
    type: Array,
    default: []
  }
})

const TOSchemaBaru = new mongoose.Schema({
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
  review: {
    type: reviewSchema,
    required: true
  }
}, {
  writeConcern: {
  j: true,
  wtimeout: 5000
}}) 



const TryoutDBBaru =  mongoose.models.soalTO || mongoose.model('soalTO', TOSchemaBaru)

module.exports = TryoutDBBaru