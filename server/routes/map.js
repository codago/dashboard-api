const express = require('express');
const router = express.Router();
const mapController = require('../controller/mapController')
const istoken = require('../helpers/checker')

router.get('/',mapController.read)
router.post('/',mapController.add)
router.post('/search',mapController.search)
router.put('/:id',mapController.edit)
router.delete('/:id',mapController.destroy)
router.get('/:id',mapController.findbyid)

module.exports = router;
