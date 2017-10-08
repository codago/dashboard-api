'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const config = require('../config');
const server = require('../app');
const Data = require('../models/data')

const should = chai.should();

chai.use(chaiHTTP);

describe('data test',function() {
  beforeEach(function(done) {
    Data.collection.drop();
    let data = new Data({
      letter: "A",
      frequency: 1.1
    })
    data.save(function(err){
      done();
    })
  });

  afterEach(function(done) {
    Data.collection.drop();
    done();
  });

  //READ
  it('Should read all the data within the collection on /api/data GET', function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body.should.have.lengthOf(1)
      res.body[0].should.have.property('letter')
      res.body[0].should.have.property('frequency')
      res.body[0].letter.should.equal('A')
      res.body[0].frequency.should.equal(1.1);
      res.body[0].should.be.a('object');
      done()
    })
  })

  //FIND
  it('Should find a specific data on /api/data/:id', function(done){
    Data.findOne({letter:"A"}, function(err, data) {
      chai.request(server)
      .get(`/api/data/${data._id}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('frequency')
        res.body.data.should.have.property('letter')
        res.body.data.letter.should.equal('A')
        res.body.data.frequency.should.equal(1.1)
        done()
      })
    })
  })

  //ADD
  it('Should add new data into the collection on /api/data/ POST', function(done){
    chai.request(server)
    .post('/api/data')
    .send({
      letter: "B",
      frequency: 2.2
    })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.should.have.property('success')
      res.body.should.have.property('message')
      res.body.should.have.property('data')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('frequency')
      res.body.data.should.have.property('letter')
      res.body.data.letter.should.equal('B')
      res.body.data.frequency.should.equal(2.2)
      done()
    })
  })

  //DELETE
  it('Should delete data from the collection using id on /api/data/:id DELETE', function(done){
    Data.findOne({letter:"A"}, function(err, data){
      chai.request(server)
      .delete(`/api/data/${data._id}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('frequency')
        res.body.data.should.have.property('letter')
        res.body.data.letter.should.equal('A')
        res.body.data.frequency.should.equal(1.1)
        done()
      })
    })
  })

  //UPDATE
  it('Should update a specific data from the collection using id on /api/data/:id PUT', function(done){
    Data.findOne({letter:"A"}, function(err, data){
      chai.request(server)
      .put(`/api/data/${data._id}`)
      .send({
        letter: "B",
        frequency: 2.2
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('frequency')
        res.body.data.should.have.property('letter')
        res.body.data.letter.should.equal('B')
        res.body.data.frequency.should.equal(2.2)
        done()
      })
    })
  })

  //BROWSE
  it('Should find a specific data from the collection by filtering its properties from /api/data/search POST', function(done){
    chai.request(server)
    .post('/api/data/search')
    .send({letter:"A"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      res.body[0].should.have.property('_id')
      res.body[0].should.have.property('frequency')
      res.body[0].should.have.property('letter')
      res.body[0].letter.should.equal('A')
      res.body[0].frequency.should.equal(1.1)
      done()
    })
  })
})
