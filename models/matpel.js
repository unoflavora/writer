const mongoose = require('mongoose')

const mataPelajaranSchema = new mongoose.Schema({
  mataPelajaran: String,
  materi: Object
}, {
  writeConcern: {
  j: true,
  wtimeout: 5000
}}) 

const SoalDB =  mongoose.models.mataPelajaran || mongoose.model('mataPelajaran', mataPelajaranSchema)

module.exports = SoalDB