'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Maps = require('../models/maps');
let email = 'mikha'
let password = '1234'

const should = chai.should();
chai.use(chaiHTTP);

describe('Maps', function(){
  beforeEach(function(done){
    Maps.collection.drop();
    let maps = new Maps({
      title: "Trans Studio Mall",
      longitude: 107.6343728,
      latitude: -6.9261257
    })
    maps.save(function(err){
      done();
    })
  });

afterEach(function(done){
  Maps.collection.drop();
  done();
});

//find
it('should find data on /api/maps/:id GET', function(done){
  Maps.findOne({latitude: -6.9261257}, function(err, mapsdate){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      let token =  res.body.token;
      chai.request(server)
      .get(`/api/maps/${mapsdate.id}`)
      .set('x-access-token', token)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('title')
        res.body.data.title.should.equal('Trans Studio Mall')
        res.body.data.should.have.property('latitude')
        res.body.data.latitude.should.equal(-6.9261257)
        res.body.data.should.have.property('longitude')
        res.body.data.longitude.should.equal(107.6343728)
        done()
      })
    })
  })
})

//search
it('should find a specific data from the collection by using filter on /api/maps/search POST', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    let token =  res.body.token;
    chai.request(server)
    .post(`/api/maps/search`)
    .set('x-access-token', token)
    .send({latitude: -6.9261257})
    .end(function(err, res){
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array')
    res.body[0].should.be.a('object')
    res.body[0].should.have.property('_id')
    res.body[0].should.have.property('title')
    res.body[0].title.should.equal('Trans Studio Mall')
    res.body[0].should.have.property('latitude')
    res.body[0].latitude.should.equal(-6.9261257)
    res.body[0].should.have.property('longitude')
    res.body[0].longitude.should.equal(107.6343728)
    done()
})
})
})

//add
it('Should add new data into the collection on /api/maps/ POST', function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      let token =  res.body.token;
      chai.request(server)
    .post('/api/maps')
    .set('x-access-token', token)
    .send({ title: "Cihampelas Walk", longitude: 107.6103536, latitude: -6.8965475 })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
      res.body.should.have.property('success')
      res.body.should.have.property('message')
      res.body.should.have.property('data')
      res.body.data.should.have.property('_id')
      res.body.data.should.have.property('title')
      res.body.data.title.should.equal('Cihampelas Walk')
      res.body.data.should.have.property('latitude')
      res.body.data.latitude.should.equal(-6.8965475)
      res.body.data.should.have.property('longitude')
      res.body.data.longitude.should.equal(107.6103536)

            Maps.find(function(err, mapsRead){
              console.log(mapsRead,'datatt');
            })
      done()
    })
  })
})

//read
it('Should read all the data on /api/maps GET', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){
    let token =  res.body.token;
    chai.request(server)
    .get('/api/maps')
    .set('x-access-token', token)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array')
      res.body.should.have.lengthOf(1)
      res.body[0].should.be.a('object');
      res.body[0].should.have.property('title')
      res.body[0].title.should.equal('Trans Studio Mall')
      res.body[0].should.have.property('latitude')
      res.body[0].latitude.should.equal(-6.9261257)
      res.body[0].should.have.property('longitude')
      res.body[0].longitude.should.equal(107.6343728)
      done()
    })
  })
})

//update
it('Should update a data by using id on /api/maps/:id PUT', function(done){
  chai.request(server)
  .post('/api/users/login')
  .send({'email': email, 'password': password})
  .end(function(err, res){

    console.log(res.body, "res.body");
    let token =  res.body.token;
      Maps.findOne({title: 'Trans Studio Mall'}, function(err, data){
     console.log(data, "ini data update");
     chai.request(server)
     .put(`/api/maps/${data._id}`)
     .set('x-access-token', token)
     .send({title: "Trans Studio Mall"})
     .end(function(err, res){
       res.should.have.status(200);
       res.should.be.json;
       res.body.should.be.a('object')
       res.body.should.have.property('success')
       res.body.should.have.property('message')
       res.body.should.have.property('data')
       res.body.data.should.have.property('_id')
       res.body.data.should.have.property('title')
       res.body.data.title.should.equal('Trans Studio Mall')
       res.body.data.should.have.property('latitude')
       res.body.data.latitude.should.equal(-6.9261257)
       res.body.data.should.have.property('longitude')
       res.body.data.longitude.should.equal(107.6343728)
       done()
     })
   })
 })
 })

 //delete
 it('Should delete data from the collection using id on /api/maps/:id DELETE', function(done){
   chai.request(server)
   .post('/api/users/login')
   .send({'email': email, 'password': password})
   .end(function(err, res){
     console.log(res.body, "res.body");
     let token =  res.body.token;
    Maps.findOne({title: "Trans Studio Mall"}, function(err, data){
      chai.request(server)
      .delete(`/api/maps/${data._id}`)
      .set('x-access-token', token)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object')
        res.body.should.have.property('success')
        res.body.should.have.property('message')
        res.body.should.have.property('data')
        res.body.data.should.have.property('_id')
        res.body.data.should.have.property('title')
        res.body.data.title.should.equal('Trans Studio Mall')
        res.body.data.should.have.property('latitude')
        res.body.data.latitude.should.equal(-6.9261257)
        res.body.data.should.have.property('longitude')
        res.body.data.longitude.should.equal(107.6343728)
        done()
      })
    })
  })
 })

 })
