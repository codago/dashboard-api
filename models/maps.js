'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Maps', new mongoose.Schema({
  title: String,
  latitude: Number,
  longitude: Number
}))
