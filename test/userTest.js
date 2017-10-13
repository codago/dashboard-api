'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require('../models/user');

const should = chai.should();
chai.use(chaiHTTP);

let email = 'markus'
let password = '1234'
let retypepassword = '1234'

describe('user', function(){

  it('should register a SINGLE user on api/users/register POST', function(done){
    chai.request(server)
    .post('/api/users/register')
    .send({'email': email, 'password': password, 'retypepassword': retypepassword})
    .end(function(err, res){
      res.body.data.email.should.equal('markus');
      done();
    })
  })

  it('should login a SINGLE user on api/users/login POST', function(done){
    chai.request(server)
    .post('/api/users/login')
    .send({'email': email, 'password': password})
    .end(function(err, res){
      res.body.data.email.should.equal('markus');
      done();
    })
  })


    User.findOne({
      email: email
    }, function(err, user){
      if(err) throw err;
      User.remove({ email: email }, function (err) {
        if (err) return handleError(err);
        console.log("delete success");
      });
    })
})
