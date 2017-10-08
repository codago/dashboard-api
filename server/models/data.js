"use strict"
const mongoose = require('mongoose');

module.exports = mongoose.model('Data', new mongoose.Schema({
  letter: String,
  frequency: Number
}))
