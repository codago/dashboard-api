"use strict"
const express = require('express');
const router = express.Router();
const Data = require('../models/data')

//READ
router.get('/', function(req, res) {
  Data.find(function(err, data) {
    if(err) {
      res.json({'ERROR': err  })
    } else {
      res.json(data)
    }
  })
})

//FIND
router.get('/:id', function(req, res) {
  Data.findById(req.params.id, function(err, data) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      let searchData = Object.assign({}, data._doc)
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
  let data = new Data({
    letter: req.body.letter,
    frequency: parseFloat(req.body.frequency)
  });
  data.save(function(err, fileData) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      let fileDataClone = Object.assign({}, fileData._doc)
      delete fileDataClone.__v
      res.json({
        success: true,
        message: "data have been added",
        data: fileDataClone
      });
    }
  })
});

//DELETE
router.delete('/:id', function(req, res) {
  Data.findById(req.params.id, function(err, data) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      data.remove(function(err) {
        if(err) {
          res.json({'ERROR': err})
        } else {
          let deletedData = Object.assign({}, data._doc)
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
  Data.findById(req.params.id, function(err, data) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      data.letter = req.body.letter
      data.frequency = parseFloat(req.body.frequency)
      data.save(function(err) {
        let updatedData = Object.assign({}, data._doc)
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

  Data.find(filterQuery, function(err,data) {
    res.json(data)
  })
})


module.exports = router;
