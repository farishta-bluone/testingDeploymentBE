const express = require("express");

const router = express.Router();

const annealingController = require("../controllers/annealing");

router.get('/', annealingController.getBatches)

router.post('/', annealingController.postAddBatch)

router.put('/:id', annealingController.updateBatch)

router.put('/report', annealingController.updateReport)

module.exports = router;