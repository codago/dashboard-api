"use strict"
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, account){
    if(err) {
      console.error(err);
    }
    res.json(account)
  })
})

router.post('/register', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, userAccount){
    if(err) {
      console.error(err);
    }
    if(req.body.password !== req.body.retypepassword) {
      return res.json({success: false, message: 'Password is not the same'})
    } else {
      let user = new User({
        email: req.body.email,
        password: req.body.password,
      });
      let token = jwt.sign(
        {id: user._id, username: user.email}, config.secretKey, {
            expiresIn: 86400 });
      user.token = token;
      user.save(function(err, newUser) {
        if(err) {
          res.json({'ERROR': err})
        } else {
          let data = Object.assign({}, newUser._doc)
          delete data.password
          delete data.__v
          res.json({data})
        }
      })
    }
  })
});



router.post('/login', function(req, res, next) {
  User.findOne({email: req.body.email},function(err, account) {
    let data = Object.assign({}, account._doc)
    delete data.password
    delete data.__v
    res.json({data})
  });
});

router.post('/check', function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  console.log(token);
  jwt.verify(token, config.secretKey, function(err, decoded) {
    if(err) {
      return res.json({success: false, message: 'failed to authenticate token'})
    } else {
      res.json({valid:true});
    }
  })
});

router.get('/destroy', function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  jwt.verify(token, config.secretKey, function(err, decoded) {
    if(err) {
      res.json({logout:false});
    } else {
      User.findOne({email: decoded.username}, function(err, account) {
        if(account._doc.token) {
            account._doc.token = null;
            res.json({logout: true})
        } else {
          res.json({logout: false})
        }
      })
    }
  })
});


module.exports = router;
