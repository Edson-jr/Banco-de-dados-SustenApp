const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var UserSchema = new Schema({
  nickname: {
    type: String,
    required: 'Enter the name of the nickname',
  },
  city: {
    type: String,
    required: 'Enter the name of the city',
  },
  email: {
    type: String,
    required: 'email is required',
    uniqued: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: 'password is required',
    select: false,
    set: (value) => bcrypt.hashSync(value, 10),
  },
  erased: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', UserSchema)
