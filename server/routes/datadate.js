"use strict"
var express = require('express');
var router = express.Router();
var Datadate = require('../models/datadate')


//READ
router.get('/', function(req, res) {
  Datadate.find(function(err, datadate) {
    if(err) {
      res.json({'ERROR': err  })
    } else {
      res.json(datadate)
    }
  })
})

//FIND
router.get('/:id', function(req, res) {
  Datadate.findById(req.params.id, function(err, datadate) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      let searchData = Object.assign({}, datadate._doc)
      delete searchData.__v
      res.json({
        success: true,
        message: "data found",
        data: searchData
      })
    }
  })
})

//ADD
router.post('/', function(req, res) {
  let datadate = new Datadate({
    letter: req.body.letter,
    frequency: parseFloat(req.body.frequency)
  })
  datadate.save(function(err, datadateFile) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      let datadateFileClone = Object.assign({}, datadateFile._doc)
      delete datadateFileClone.__v
      res.json({
        success: true,
        message: "data have been added",
        data: datadateFileClone
      });
    }
  })
})

//DELETE
router.delete('/:id', function(req, res) {
  Datadate.findById(req.params.id, function(err, datadate) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      datadate.remove(function(err) {
        if(err) {
          res.json({'ERROR': err})
        } else {
          let deletedData = Object.assign({}, datadate._doc)
          delete deletedData.__v
          res.json({
            success: true,
            message: "data have been deleted",
            data: deletedData
          });
        }
      })
    }
  })
})

//UPDATE
router.put('/:id', function(req, res) {
  Datadate.findById(req.params.id, function(err, datadate) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      datadate.letter = req.body.letter
      datadate.frequency = parseFloat(req.body.frequency)
      datadate.save(function(err) {
        let updatedData = Object.assign({}, datadate._doc)
        delete updatedData.__v
        res.json({
          success: true,
          message: "data have been updated",
          data: updatedData
        })
      })
    }
  })
})

//BROWSE
router.post('/search', function(req, res) {
  let filterQuery = {}
  if(req.body.letter) {
    filterQuery['letter'] = req.body.letter
  }

  if(req.body.frequency) {
    filterQuery['frequency'] = parseFloat(req.body.frequency)
  }

  Datadate.find(filterQuery, function(err,data) {
    res.json(data)
  })
})

module.exports = router;
