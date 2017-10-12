"use strict"
const express = require('express');
const router = express.Router();
const Maps = require('../models/maps')

//READ
router.get('/', function(req, res) {
  Maps.find(function(err, mapsData) {
    if(err) {
      res.json({'ERROR': err  })
    } else {
      res.json(mapsData)
    }
  })
})

//FIND
router.get('/:id', function(req, res) {
  Maps.findById(req.params.id, function(err, mapsData) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      let searchData = Object.assign({}, mapsData._doc)
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
  let maps = new Maps({
    title: req.body.title,
    lat: parseFloat(req.body.lat),
    lng: parseFloat(req.body.lng)
  });
  maps.save(function(err, mapsData) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      let mapsDataClone = Object.assign({}, mapsData._doc)
      delete mapsDataClone.__v
      res.json({
        success: true,
        message: "data have been added",
        data: mapsDataClone
      });
    }
  })
});

//DELETE
router.delete('/:id', function(req, res) {
  Maps.findById(req.params.id, function(err, mapData) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      mapData.remove(function(err) {
        if(err) {
          res.json({'ERROR': err})
        } else {
          let deletedData = Object.assign({}, mapData._doc)
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
  Maps.findById(req.params.id, function(err, mapData) {
    if(err) {
      res.json({'ERROR': err})
    } else {
      mapData.title = req.body.title
      mapData.lat = parseFloat(req.body.lat)
      mapData.lng = parseFloat(req.body.lng)
      mapData.save(function(err) {
        let updatedData = Object.assign({}, mapData._doc)
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
  if(req.body.title) {
    filterQuery['title'] = {'$regex': req.body.title, '$options': 'i'}
  }

  if(req.body.lat) {
    filterQuery['lat'] = parseFloat(req.body.lat)
  }

  if(req.body.lng) {
    filterQuery['lng'] = parseFloat(req.body.lng)
  }

  Maps.find(filterQuery, function(err,data) {
    res.json(data)
  })
})


module.exports = router;
