'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const config = require('../config');
const server = require('../app');
const Datadate = require('../models/datadate')

const should = chai.should();

chai.use(chaiHTTP);

describe('datadate test',function() {
  beforeEach(function(done) {
    Datadate.collection.drop();
    let datadate = new Datadate({
      letter: "04-06-1992",
      frequency: 1.1
    })
    datadate.save(function(err){
      done();
    })
  });

  afterEach(function(done) {
    Datadate.collection.drop();
    done();
  });

  //READ
  it('Should read all the datadate within the collection on /api/datadate GET', function(done){
    chai.request(server)
    .get('/api/datadate')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body.should.have.lengthOf(1)
      res.body[0].should.have.property('letter')
      res.body[0].should.have.property('frequency')
      res.body[0].letter.should.equal('04-06-1992')
      res.body[0].frequency.should.equal(1.1);
      res.body[0].should.be.a('object');
      done()
    })
  })

  //FIND
  it('Should find a specific datadate on /api/datadate/:id', function(done){
    Datadate.findOne({letter:"04-06-1992"}, function(err, datadate) {
      chai.request(server)
      .get(`/api/datadate/${datadate._id}`)
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
        res.body.data.letter.should.equal('04-06-1992')
        res.body.data.frequency.should.equal(1.1)
        done()
      })
    })
  })

  //ADD
  it('Should add new datadate into the collection on /api/datadate/ POST', function(done){
    chai.request(server)
    .post('/api/datadate')
    .send({
      letter: "08-10-2017",
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
      res.body.data.letter.should.equal('08-10-2017')
      res.body.data.frequency.should.equal(2.2)
      done()
    })
  })

  //DELETE
  it('Should delete datadate from the collection using id on /api/datadate/:id DELETE', function(done){
    Datadate.findOne({letter:"04-06-1992"}, function(err, datadate){
      chai.request(server)
      .delete(`/api/datadate/${datadate._id}`)
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
        res.body.data.letter.should.equal('04-06-1992')
        res.body.data.frequency.should.equal(1.1)
        done()
      })
    })
  })

  //UPDATE
  it('Should update a specific datadate from the collection using id on /api/datadate/:id PUT', function(done){
    Datadate.findOne({letter:"04-06-1992"}, function(err, datadate){
      chai.request(server)
      .put(`/api/datadate/${datadate._id}`)
      .send({
        letter: "08-10-2017",
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
        res.body.data.letter.should.equal('08-10-2017')
        res.body.data.frequency.should.equal(2.2)
        done()
      })
    })
  })

  //BROWSE
  it('Should find a specific datadate from the collection by filtering its properties from /api/datadate/search POST', function(done){
    chai.request(server)
    .post('/api/datadate/search')
    .send({letter:"04-06-1992"})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      res.body[0].should.have.property('_id')
      res.body[0].should.have.property('frequency')
      res.body[0].should.have.property('letter')
      res.body[0].letter.should.equal('04-06-1992')
      res.body[0].frequency.should.equal(1.1)
      done()
    })
  })
})
