'use strict'

const express = require('express');
const router = express.Router();
const DataDate = require('../models/dataDate');
const checker = require('../helpers/checker')


router.post('/search', checker, function(req, res, next){
  let searchData = {};

  if(req.body.letter){
    searchData['letter'] = req.body.letter;
  }
  if(req.body.frequency){
    searchData['frequency'] = Number(req.body.frequency);
  }
  DataDate.find(searchData, function(err, dataSearch){
  res.json(dataSearch)
})
})

router.get('/', checker, function(req, res){
  DataDate.find(function(err, dataRead){
    if(err){
      res.json('Error', err)
    }else{
      res.json(dataRead)
    }
  })
})

router.post('/', checker, function(req, res){
  let letter = req.body.letter;
  let frequency = Number(req.body.frequency);

  if(!(letter || frequency)){
    return res.json({success: false, message: 'Authentication failed. Make sure you input the letter and the frequency values.'});
  }

    var dataDate = new DataDate({
      letter: letter,
      frequency: frequency
    })
    dataDate.save(function(err, dataAdd){
      if(err) throw err;
      console.log(dataAdd, 'teessssttt');
      res.json({success: true, message: "Data have been added", data: dataAdd})
    })
})

router.put('/:id', checker, function(req, res){
  let params = req.body
  DataDate.findById(req.params.id, function(err, dataEdit){
    if(err){
      res.json('Error', err)
    }else{
      dataEdit.letter = req.body.letter || dataEdit.letter;
      dataEdit.frequency = req.body.frequency || dataEdit.frequency;
      dataEdit.save(function(err, dataNew){
        if(err){
          res.json("Error", err)
        }
        res.json({success: true, message: "Data have been updated", data: dataNew})
      })
    }
  })
})

router.delete('/:id', checker, function(req, res){
  DataDate.findById(req.params.id, function(err, dataDelete){
    console.log(dataDelete, "delete");
    if(err){
      res.json("error", err)
    }else{
      dataDelete.remove(function(err){
        if(err){
          res.json("Error", err)
        }else{
          let data = Object.assign({}, dataDelete._doc)
          delete data.__v
          res.json({success: true, message: "Data have been deleted", data: data})
        }
      })
    }
  })
})

router.get('/:id', checker, function(req, res){
  console.log(req.params.id, "testsssssssid");
  DataDate.findById(req.params.id, function(err, dataFind){
    if(err){
      res.json("error", err)
    }else{
        res.json({success: true, message: "Data found", data: dataFind})
        }
      })
    })

module.exports = router;
