'use strict'
var express = require('express');
var router = express.Router();
const userChecker = require('../helpers/userChecker')
const axios = require('axios');

/* GET home page. */

module.exports = function(passport) {
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }))

  router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/')
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  router.get('/home', userChecker, function(req, res){
    console.log("ini req.user:", req.user.data);
    res.render('home', { title: 'Express', userData: req.user.data })
  })

  router.get('/data', userChecker, function(req, res){
    res.render('data', { title: 'Express' })
  })


  router.get('/datadate', userChecker, function(req,res) {
    res.render('datadate', {title: 'Express'})
  })

  router.get('/maps', userChecker, function(req,res) {
    res.render('maps', {title: 'Express'})
  })


  router.get('/bar', function(req,res) {
    axios.get('http://localhost:3001/api/data/')
    .then(function(data){
      let apiData = data.data
      let chartData = []
      for(var x = 0; x<apiData.length; x++) {
        chartData.push({y: apiData[x]['frequency'], label: apiData[x]['letter']})
      }
      res.render('bar', {
        title: 'Express',
        chartData: JSON.stringify(chartData)
      })
    }).catch(function(err) {
      if(err){
        console.error(err);
      }
    })
  })

  router.get('/pie', function(req,res) {
    axios.get('http://localhost:3001/api/data/')
    .then(function(data){
      let apiData = data.data
      let chartData = []
      for(var x = 0; x<apiData.length; x++) {
        chartData.push({y: apiData[x]['frequency'], label: apiData[x]['letter']})
      }
      res.render('pie', {
        title: 'Express',
        chartData: JSON.stringify(chartData)
      })
    }).catch(function(err) {
      if(err){
        console.error(err);
      }
    })
  })

  router.get('/line', function(req,res){
    axios.get('http://localhost:3001/api/datadate/')
    .then(function(data){
      let apiData = data.data
      let chartData = []
      for(var x = 0; x<apiData.length; x++) {
        chartData.push({y: apiData[x]['frequency'], label: apiData[x]['letter']})
      }
      res.render('line', {
        title: 'Express',
        chartData: JSON.stringify(chartData)
      })
    }).catch(function(err) {
      if(err){
        console.error(err);
      }
    })
  })

  router.get('/map', function(req, res) {
    res.render('map2', {
      title: 'express'
    })
  })

  return router;
}
