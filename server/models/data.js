'use strict'
const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const dataSchema = new mongoose.Schema({
  letter:{
    type:String
  },
  frequency:{
    type:SchemaTypes.Double
  }
})

module.exports = mongoose.model('Data',dataSchema)
