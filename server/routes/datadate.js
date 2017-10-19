const express = require('express');
const router = express.Router();
const dateController = require('../controller/dateController')
const istoken = require('../helpers/checker')

router.get('/',dateController.read)
router.post('/',dateController.add)
router.post('/seed_data',dateController.seedData)
router.post('/search',dateController.search)
router.put('/:id',dateController.edit)
router.delete('/:id',dateController.destroy)
router.get('/:id',dateController.findbyid)

module.exports = router;
