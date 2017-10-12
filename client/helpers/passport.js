'use strict'

const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');

module.exports = function(passport) {
  passport.serializeUser(function(user, done){
    done(null, user._id)
  });

  passport.deserializeUser(function(id, done){
    let url = `http://localhost:3001/api/users/${id}`
    axios.get(url)
    .then(function(user){
      // console.log(user);
      done(null, user)
    }).catch(function(err){
      done(err);
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    if(email){
      email = email.toLowerCase();
    }
    if(!req.user){
      axios.post('http://localhost:3001/api/users/register', {
        email: req.body.email,
        password: req.body.password,
        retypepassword: req.body.retypepassword
      }).then(function(response){
        let userData = response.data.data
        return done(null, userData)
      }).catch(function(err){
        return done(err);
      })
    } else {
      return done(null, req.user)
    }
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done){
    if(email){
      email = email.toLowerCase();
    }
    axios.post('http://localhost:3001/api/users/login',{
      email: req.body.email,
      password: req.body.password
    }).then(function(response){
      let userData = response.data.data
      console.log("ini userData:", userData);
      return done(null, userData)
    }).catch(function(err){
      return done(err)
    })
  }))

}
