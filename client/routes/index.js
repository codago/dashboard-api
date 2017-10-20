'use strict'
var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/userController')
const isLoggedIn = require('../helpers/auth')

module.exports = function(passport){
  router.get('/',usercontroller.isToken,usercontroller.dashboard)

  router.get('/line', usercontroller.linepage)

  router.get('/pie', usercontroller.piepage)
  router.get('/bar',usercontroller.barpage)
  router.get('/map', usercontroller.mappage)

  router.get('/login',usercontroller.isToken,usercontroller.loginpage)
  router.get('/logout',usercontroller.logout)
  router.get('/home',isLoggedIn,usercontroller.homepage)
  router.get('/data',isLoggedIn,usercontroller.datapage)
  router.get('/datadate',isLoggedIn,usercontroller.datadatepage)
  router.get('/maps',isLoggedIn,usercontroller.mapspage)

  router.post('/signup',passport.authenticate('local-signup',{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash: true
  }))

  router.post('/login',usercontroller.isToken,passport.authenticate('local-login',{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash:true
  }))

  return router
}
