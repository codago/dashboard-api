var express = require('express');
var router = express.Router();
var User = require("../models/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setup', function(req, res){
  var markus = new User({
    username: 'markus',
    password: '1234'
  })
  markus.save(function(err){
    if(err) throw err;
    console.log('User saved successfully');
    res.json({success: true})
  })
})

module.exports = router;
