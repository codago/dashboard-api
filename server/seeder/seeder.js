const Data = require('../models/data')
const datas = require('./data.json')
const config = require('../config')
const assert = require('assert')
var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose")

MongoClient.connect(config.database,function(err,db){
  Data.collection.insertMany(datas,function(err){
    assert.equal(null,err)
    console.log("inserted");
    db.close()
  })
})
