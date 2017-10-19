'use strict'

const chai = require('chai')
const chaiHTTP = require('chai-http')
const server = require('../app')
const Data = require('../models/data')

const should = chai.should()
chai.use(chaiHTTP)

describe('data',function(){
  Data.collection.drop()
  beforeEach(function(done){
    let newData = new Data({
      letter:'A',
      frequency:1.1
    })
    newData.save(function(err){
      done()
    })
  })

  afterEach(function(done){
    Data.collection.drop()
    done()
  })

  it('Should list ALL data on /api/data GET',function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.have.property("_id")
      res.body[0].should.have.property("letter")
      res.body[0].should.have.property("frequency")
      res.body[0].letter.should.equal('A')
      res.body[0].frequency.should.equal(1.1)
      done()
    })
  })

  it('Should list a single data on /api/data/<id> GET',function(done){
    let newData = new Data({
      letter:'B',
      frequency:1.2
    })

    newData.save(function(err,data){
      chai.request(server)
      .get(`/api/data/${data._id}`)
      .end(function(err,res){
        res.should.have.status(200)
        res.should.be.a.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.success.should.equal(true)
        res.body.message.should.equal('data found')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('letter')
        res.body.data.should.have.property('frequency')
        res.body.data.letter.should.equal('B')
        res.body.data.frequency.should.equal(1.2)
        res.body.data.frequency.should.be.a('number')
        res.body.data._id.should.equal(data.id)
        done()
      })
    })
  })

  it('Should add a SINGLE data on /api/data POST',function(done){
    chai.request(server)
    .post('/api/data')
    .send({'letter':'C','frequency':3.2})
    .end(function(err,res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.should.have.property('success')
      res.body.should.have.property('message')
      res.body.should.have.property('data')
      res.body.success.should.equal(true)
      res.body.message.should.equal('data have been added')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('letter')
      res.body.data.should.have.property('frequency')
      res.body.data.letter.should.equal('C')
      res.body.data.frequency.should.be.a('number')
      res.body.data.frequency.should.equal(3.2)
      done()
    })
  })

  it('Should update a SINGLE data on /api/data/<id> PUT',function(done){
    chai.request(server)
    .get('/api/data') // get id
    .end(function(err,res){
      // console.log(res);
      chai.request(server)
      .put(`/api/data/${res.body[0]._id}`)
      .send({'letter':'A','frequency':res.body[0].frequency})
      .end(function(err,response){
        console.log(response);
        response.should.have.status(200)
        response.should.be.json
        response.body.should.be.a('object')
        response.body.should.have.property('success')
        response.body.should.have.property('message')
        response.body.should.have.property('data')
        response.body.success.should.equal(true)
        response.body.message.should.equal('data have been updated')
        response.body.data.should.have.property('_id')
        response.body.data.should.have.property('letter')
        response.body.data.should.have.property('frequency')
        response.body.data.letter.should.equal('A')
        done()
      })
    })
  })

  it('Should delete a SINGLE data on /api/data/<id> DELETE',function(done){
    chai.request(server)
    .get('/api/data')
    .end(function(err,data){;
      chai.request(server)
      .delete(`/api/data/${data.body[0]._id}`)
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200)
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.success.should.equal(true)
        res.body.message.should.equal('data have been deleted')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('letter')
        res.body.data.should.have.property('frequency')
        res.body.data.letter.should.equal('A')
        done()
      })
    })
  })

  it('Should find a SINGLE data LETTER on /api/data/search POST',function(done){
    chai.request(server)
    .post('/api/data/search')
    .send({'letter':'A'})
    .end(function(err,res){
      console.log(res);
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.have.property("_id")
      res.body[0].should.have.property("letter")
      res.body[0].should.have.property("frequency")
      res.body[0].letter.should.equal('A')
      res.body[0].frequency.should.equal(1.1)
      done()
    })
  })

  it('Should find a SINGLE data FREQUENCY on /api/data/search POST',function(done){
    chai.request(server)
    .post('/api/data/search')
    .send({'frequency':1.1})
    .end(function(err,res){
      console.log(res);
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.have.property("_id")
      res.body[0].should.have.property("letter")
      res.body[0].should.have.property("frequency")
      res.body[0].letter.should.equal('A')
      res.body[0].frequency.should.equal(1.1)
      done()
    })
  })

  it('Should find a SINGLE data LETTER and FREQUENCY on /api/data/search POST',function(done){
    chai.request(server)
    .post('/api/data/search')
    .send({'letter':'A','frequency':1.1})
    .end(function(err,res){
      console.log(res.body.data[0]);
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.data[0].should.have.property("_id")
      res.body.data[0].should.have.property("letter")
      res.body.data[0].should.have.property("frequency")
      res.body.data[0].letter.should.equal('A')
      res.body.data[0].frequency.should.equal(1.1)
      done()
    })
  })
})
