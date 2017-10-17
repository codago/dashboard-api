'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const DataDate = require('../models/dataDate');
let email = 'mikha'
let password = '1234'

const should = chai.should();
chai.use(chaiHTTP);

describe('dataDate', function(){
  beforeEach(function(done){
    DataDate.collection.drop();
    let dataDate = new DataDate({
      letter: "2017-10-16",
      frequency: 1.2
    })
    dataDate.save(function(err){
      done();
    })
  });

afterEach(function(done){
  DataDate.collection.drop();
  done();
});

//find
it('should find data on /api/datadate/:id GET', function(done){
  DataDate.findOne({frequency: 1.2}, function(err, datadate){
    console.log(datadate, "ini data");
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      console.log(res.body, "respon tokennnnnn");
      let token =  res.body.token;
      chai.request(server)
      .get(`/api/datadate/${datadate.id}`)
      .set('x-access-token', token)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('letter')
        res.body.data.letter.should.equal('2017-10-16')
        res.body.data.should.have.property('frequency')
        res.body.data.frequency.should.equal(1.2)
        done()
      })
    })
  })
})

//search
it('should find a specific data from the collection by using filter on /api/datadate/search POST', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    console.log(res.body, "res.body");
    let token =  res.body.token;
    chai.request(server)
    .post(`/api/datadate/search`)
    .set('x-access-token', token)
    .send({frequency: 1.2})
    .end(function(err, res){
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array')
    res.body[0].should.be.a('object')
    res.body[0].should.have.property('_id')
    res.body[0].should.have.property('frequency')
    res.body[0].letter.should.equal('2017-10-16')
    res.body[0].should.have.property('letter')
    res.body[0].frequency.should.equal(1.2)
    done()
})
})
})

//add
it('Should add new data into the collection on /api/datadate/ POST', function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      console.log(res.body, "res.body");
      let token =  res.body.token;
      console.log(token, "tokennnn");
      chai.request(server)
    .post('/api/datadate')
    .set('x-access-token', token)
    .send({ letter: "2017-10-17", frequency: 1.4 })
    .end(function(err, res){
      console.log(server, "serverrrr");
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.should.have.property('success')
      res.body.should.have.property('message')
      res.body.should.have.property('data')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('frequency')
      res.body.data.frequency.should.equal(1.4)
      res.body.data.should.have.property('letter')
      res.body.data.letter.should.equal('2017-10-17')
      done()
    })
  })
})

//read
it('Should read all the data on /api/datadate GET', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    console.log(res.body, "res.body");
    let token =  res.body.token;
    chai.request(server)
    .get('/api/datadate')
    .set('x-access-token', token)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body.should.have.lengthOf(1)
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('letter')
      res.body[0].should.have.property('frequency')
      res.body[0].letter.should.equal('2017-10-16')
      res.body[0].frequency.should.equal(1.2);
      done()
    })
  })
})

//update
it('Should update a data by using id on /api/datadate/:id PUT', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    console.log(res.body, "res.body");
    let token =  res.body.token;
   DataDate.findOne({letter:"2017-10-16"}, function(err, data){
     chai.request(server)
     .put(`/api/datadate/${data._id}`)
     .set('x-access-token', token)
     .send({ letter: "2017-11-16", frequency: 2.2 })
     .end(function(err, res){
       res.should.have.status(200);
       res.should.be.json;
       res.body.should.be.a('object')
       res.body.should.have.property('success')
       res.body.should.have.property('message')
       res.body.should.have.property('data')
       res.body.data.should.have.property('_id')
       res.body.data.should.have.property('frequency')
       res.body.data.frequency.should.equal(2.2)
       res.body.data.should.have.property('letter')
       res.body.data.letter.should.equal('2017-11-16')
       done()
     })
   })
 })
 })

 //delete
 it('Should delete data from the collection using id on /api/datadate/:id DELETE', function(done){
   chai.request(server)
   .post('/api/users/login')
   .send({'email': email, 'password': password})
   .end(function(err, res){
     console.log(res.body, "res.body");
     let token =  res.body.token;
    DataDate.findOne({letter:"2017-10-16"}, function(err, data){
      chai.request(server)
      .delete(`/api/datadate/${data._id}`)
      .set('x-access-token', token)
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
        res.body.data.letter.should.equal('2017-10-16')
        res.body.data.frequency.should.equal(1.2)
        done()
      })
    })
  })
 })

})
