'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Data = require('../models/data');
let email = 'mikha'
let password = '1234'

const should = chai.should();
chai.use(chaiHTTP);

describe('data', function(){
  beforeEach(function(done){
    Data.collection.drop();
    let data = new Data({
      letter: "A",
      frequency: 1.1
    })
    data.save(function(err){
      done();
    })
  });

  afterEach(function(done){
    Data.collection.drop();
    done();
  });

  //find
  it('should find data on /api/data/:id GET', function(done){
    Data.findOne({frequency: 1.1}, function(err, data){
      console.log(data, "ini data");
      chai.request(server)
      .post('/api/users/login')
      .send({'email': email, 'password': password})
      .end(function(err, res){
        console.log(res.body, "respon tokennnnnn");
        let token =  res.body.token;
        chai.request(server)
        .get(`/api/data/${data.id}`)
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
          res.body.data.letter.should.equal('A')
          res.body.data.should.have.property('frequency')
          res.body.data.frequency.should.equal(1.1)
          done()
        })
      })
    })
  })

  //search
  it('should find a specific data from the collection by using filter on /api/data/search POST', function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      console.log(res.body, "res.body");
      let token =  res.body.token;
      chai.request(server)
      .post(`/api/data/search`)
      .set('x-access-token', token)
      .send({letter: "A"})
      .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body[0].should.be.a('object')
      res.body[0].should.have.property('_id')
      res.body[0].should.have.property('frequency')
      res.body[0].letter.should.equal('A')
      res.body[0].should.have.property('letter')
      res.body[0].frequency.should.equal(1.1)
      done()
 })
})
})

//add
it('Should add new data into the collection on /api/data/ POST', function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      console.log(res.body, "res.body");
      let token =  res.body.token;
      console.log(token, "tokennnn");
      chai.request(server)
    .post('/api/data')
    .set('x-access-token', token)
    .send({ letter: "B", frequency: 1.2 })
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
      res.body.data.frequency.should.equal(1.2)
      res.body.data.should.have.property('letter')
      res.body.data.letter.should.equal('B')
      done()
    })
  })
})

//read
it('Should read all the data on /api/data GET', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    console.log(res.body, "res.body");
    let token =  res.body.token;
    chai.request(server)
    .get('/api/data')
    .set('x-access-token', token)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body.should.have.lengthOf(1)
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('letter')
      res.body[0].should.have.property('frequency')
      res.body[0].letter.should.equal('A')
      res.body[0].frequency.should.equal(1.1);
      done()
    })
  })
})


//update
it('Should update a data by using id on /api/data/:id PUT', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    console.log(res.body, "res.body");
    let token =  res.body.token;
   Data.findOne({letter:"A"}, function(err, data){
     chai.request(server)
     .put(`/api/data/${data._id}`)
     .set('x-access-token', token)
     .send({ letter: "B", frequency: 2.2 })
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
       res.body.data.letter.should.equal('B')
       done()
     })
   })
 })
 })

//delete
it('Should delete data from the collection using id on /api/data/:id DELETE', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    console.log(res.body, "res.body");
    let token =  res.body.token;
   Data.findOne({letter:"A"}, function(err, data){
     chai.request(server)
     .delete(`/api/data/${data._id}`)
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
       res.body.data.letter.should.equal('A')
       res.body.data.frequency.should.equal(1.1)
       done()
     })
   })
 })
})


  })
