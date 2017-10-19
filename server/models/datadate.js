'use strict'
const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const datadateSchema = new mongoose.Schema({
  letter:{
    type:Date
  },
  frequency:{
    type:SchemaTypes.Double
  }
})

module.exports = mongoose.model('Datadate',datadateSchema)
