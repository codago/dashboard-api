const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController')
const istoken = require('../helpers/checker')

router.get('/',dataController.read)
router.post('/',dataController.add)
router.post('/search',dataController.search)
router.put('/:id',dataController.edit)
router.delete('/:id',dataController.destroy)
router.get('/:id',dataController.findbyid)

module.exports = router;
