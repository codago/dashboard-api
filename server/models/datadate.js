"use strict"
const mongoose = require('mongoose');

module.exports = mongoose.model('Datadate', new mongoose.Schema({
  letter: String,
  frequency: Number
}))
