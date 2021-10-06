const mongoose = require('mongoose')

const kodeSchema = new mongoose.Schema({
  mataPelajaran: String,
  materi: Object
}, {
  writeConcern: {
  j: true,
  wtimeout: 5000
}}) 

const kodeDB =  mongoose.models.kode || mongoose.model('kode', kodeSchema)

module.exports = kodeDB