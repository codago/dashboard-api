'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const config = require('../config');
const server = require('../app');
const Maps = require('../models/maps')

const should = chai.should();

chai.use(chaiHTTP);

describe('map test',function() {
  beforeEach(function(done) {
    Maps.collection.drop();
    let map = new Maps({
      title: "Monas",
      lat: 6.1754,
      lng: 106.8272
    })
    map.save(function(err){
      done();
    })
  });

  afterEach(function(done) {
    Maps.collection.drop();
    done();
  });

  //READ
  it('Should read all the maps data within the collection on /api/maps GET', function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body.should.have.lengthOf(1)
      res.body[0].should.have.property('title')
      res.body[0].should.have.property('lat')
      res.body[0].should.have.property('lng')
      res.body[0].title.should.equal('Monas')
      res.body[0].lat.should.equal(6.1754);
      res.body[0].lng.should.equal(106.8272);
      res.body[0].should.be.a('object');
      done()
    })
  })

  //FIND
  it('Should find a specific map data on /api/maps/:id', function(done){
    Maps.findOne({title:"Monas"}, function(err, mapData) {
      chai.request(server)
      .get(`/api/maps/${mapData._id}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('title')
        res.body.data.should.have.property('lat')
        res.body.data.should.have.property('lng')
        res.body.data.title.should.equal('Monas')
        res.body.data.lat.should.equal(6.1754)
        res.body.data.lng.should.equal(106.8272)
        done()
      })
    })
  })

  //ADD
  it('Should add new map data into the collection on /api/maps POST', function(done){
    chai.request(server)
    .post('/api/maps')
    .send({
      title: "The White House",
      lat: 38.8977,
      lng: 77.0365
    })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.should.have.property('success')
      res.body.should.have.property('message')
      res.body.should.have.property('data')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('title')
      res.body.data.should.have.property('lat')
      res.body.data.should.have.property('lng')
      res.body.data.title.should.equal('The White House')
      res.body.data.lat.should.equal(38.8977)
      res.body.data.lng.should.equal(77.0365)
      done()
    })
  })

  //DELETE
  it('Should delete data from the collection using id on /api/maps/:id DELETE', function(done){
    Maps.findOne({title:"Monas"}, function(err, mapData){
      chai.request(server)
      .delete(`/api/maps/${mapData._id}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('title')
        res.body.data.should.have.property('lat')
        res.body.data.should.have.property('lng')
        res.body.data.title.should.equal('Monas')
        res.body.data.lat.should.equal(6.1754)
        res.body.data.lng.should.equal(106.8272)
        done()
      })
    })
  })

  //UPDATE
  it('Should update a specific map data from the collection using id on /api/maps/:id PUT', function(done){
    Maps.findOne({title:"Monas"}, function(err, mapData){
      chai.request(server)
      .put(`/api/maps/${mapData._id}`)
      .send({
        title: "The White House",
        lat: 38.8977,
        lng: 77.0365
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('title')
        res.body.data.should.have.property('lat')
        res.body.data.should.have.property('lng')
        res.body.data.title.should.equal('The White House')
        res.body.data.lat.should.equal(38.8977)
        res.body.data.lng.should.equal(77.0365)
        done()
      })
    })
  })

  //BROWSE
  it('Should find a specific map data from the collection by filtering its properties from /api/maps/search POST', function(done){
    chai.request(server)
    .post('/api/maps/search')
    .send({letter:"A"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      res.body[0].should.have.property('_id')
      res.body[0].should.have.property('title')
      res.body[0].should.have.property('lat')
      res.body[0].should.have.property('lng')
      res.body[0].title.should.equal('Monas')
      res.body[0].lat.should.equal(6.1754)
      res.body[0].lng.should.equal(106.8272)
      done()
    })
  })
})
