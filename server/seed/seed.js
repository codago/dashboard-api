const Datadate = require('../models/datadate')
const mongodb = require('mongodb')
const fs = require('fs')
const path = require('path')
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/restfulapidb';

console.log(path.join(__dirname, "data.json"));
let seedData = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")))

MongoClient.connect(url, (error, db) => {
  db.collection('datadates').drop()
  for(var x=0; x<seedData.length; x++) {
  console.log(`insert data ${x} : `, seedData[x]);
    db.collection('datadates').insertOne(seedData[x]);
  }
  db.close()
})
