'use strict'
const mongoose = require('mongoose')
require('mongoose-double')(mongoose)

const SchemaTypes = mongoose.Schema.Types

const mapSchema = new mongoose.Schema({
  title:{
    type:String
  },
  lat:{
    type:SchemaTypes.Double
  },
  lng:{
    type:SchemaTypes.Double
  }
})

module.exports = mongoose.model('Map',mapSchema)
