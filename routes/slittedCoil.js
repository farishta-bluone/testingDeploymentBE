const express = require("express");

const router = express.Router();

const slittedCoilsController = require("../controllers/slittedCoils");

router.get('/', slittedCoilsController.getCoils)

router.put('/', slittedCoilsController.updateSlits)

router.get('/list', slittedCoilsController.getSlittedCoils)

router.get('/annealed', slittedCoilsController.getAnnealedCoils)

router.get('/:id', slittedCoilsController.getSingleSlit)

module.exports = router;