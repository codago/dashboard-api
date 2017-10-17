'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('DataDate', new mongoose.Schema({
  letter: String,
  frequency: Number
}))
