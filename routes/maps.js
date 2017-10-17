'use strict'

const express = require('express');
const router = express.Router();
const Maps = require('../models/maps');
const checker = require('../helpers/checker')

router.post('/search', checker, function(req, res, next){
  let searchMaps = {};

  if(req.body.title){
    searchMaps['title'] = req.body.title;
  }
  if(req.body.latitude){
    searchMaps['latitude'] = Number(req.body.latitude);
  }
  if(req.body.longitude){
    searchMaps['longitude'] = Number(req.body.longitude);
  }
  Maps.find(searchMaps, function(err, mapSearch){
  res.json(mapSearch)
})
})

router.get('/', checker, function(req, res){
  Maps.find(function(err, mapsRead){
    if(err){
      res.json('Error', err)
    }else{
      res.json(mapsRead)
    }
  })
})

router.post('/', checker, function(req, res){
  let title = req.body.title;
  let longitude = req.body.longitude;
  let latitude = req.body.latitude;

  if(!(title || longitude || latitude)){
    return res.json({success: false, message: 'Insertion failed. Make sure you input the title, the latitude and the longitude values.'});
  }

    var maps = new Maps({
      title: title,
      longitude: longitude,
      latitude: latitude
    })
    maps.save(function(err, mapsAdd){
      if(err) throw err;
      console.log(mapsAdd, 'teessssttt');
      res.json({success: true, message: "Data have been added", data: mapsAdd})
    })
})

router.put('/:id', checker, function(req, res){
  let params = req.body
  Maps.findById(req.params.id, function(err, mapsEdit){
    if(err){
      res.json('Error', err)
    }else{
      mapsEdit.title = req.body.title || mapsEdit.title;
      mapsEdit.longitude = req.body.longitude || mapsEdit.longitude;
      mapsEdit.latitude = req.body.latitude || mapsEdit.latitude;
      mapsEdit.save(function(err, mapsNew){
        if(err){
          res.json("Error", err)
        }
        res.json({success: true, message: "Data have been updated", data: mapsNew})
      })
    }
  })
})

router.delete('/:id', checker, function(req, res){
  Maps.findById(req.params.id, function(err, mapsDelete){
    console.log(mapsDelete, "delete");
    if(err){
      res.json("error", err)
    }else{
      mapsDelete.remove(function(err){
        if(err){
          res.json("Error", err)
        }else{
          let maps = Object.assign({}, mapsDelete._doc)
          delete maps.__v
          res.json({success: true, message: "Data have been deleted", data: maps})
        }
      })
    }
  })
})

router.get('/:id', checker, function(req, res){
  console.log(req.params.id, "testsssssssid");
  Maps.findById(req.params.id, function(err, mapsFind){
    if(err){
      res.json("error", err)
    }else{
        res.json({success: true, message: "Data found", data: mapsFind})
        }
      })
    })

module.exports = router;
