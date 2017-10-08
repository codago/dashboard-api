'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');
const jwt = require('jsonwebtoken');

const config = require('../config');
const server = require('../app');
const User = require('../models/user')

const should = chai.should();

chai.use(chaiHTTP);

describe('user test',function() {
  beforeEach(function(done) {
      User.collection.drop()
    let user = new User({
      email: 'bimbram@gmail.com',
      password: '12345'
    })
    let token = jwt.sign(
      {id: user._id, username: user.email}, config.secretKey, {
          expiresIn: 86400 });
    user.token = token;
    user.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    User.collection.drop();
    done();
  });

  it('Should give email and token data after registration on /api/users/registration POST', function(done) {
      chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'bimbram@gmail.com',
        password: '12345',
        retypepassword:'12345'
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('token')
        res.body.data.email.should.equal('bimbram@gmail.com');
        done();
      })
  });

  it('Should give email and token data after login on /api/users/login POST', function(done) {
      chai.request(server)
      .post('/api/users/login')
      .send({email: 'bimbram@gmail.com',
            password: '12345'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.data.should.be.a('object')
        // res.body.data.should.have.property('token')
        res.body.data.email.should.equal('bimbram@gmail.com');
        done();
      })
  })

  it(`Should check the token data whether it's valid /api/users/check POST`, function(done) {
    User.findOne({email: 'bimbram@gmail.com'},function(err, account) {
      chai.request(server)
      .post('/api/users/check')
      .send(account)
      .end(function(err, res){
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('valid')
        res.body.valid.should.equal(true)
        done();
      });
    })
  })

  it(`Should destroy the account token data  /api/users/check GET`, function(done) {
    User.findOne({email: 'bimbram@gmail.com'},function(err, account) {
      chai.request(server)
      .get(`/api/users/destroy/?token=${account.token}`)
      .end(function(err, res) {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('logout')
        res.body.logout.should.equal(true)
        done();
      })
    })
  })
})
