const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TokenSchema = new Schema({
  token: {
    type: String,
  },
})

module.exports = mongoose.model('Token', TokenSchema)
