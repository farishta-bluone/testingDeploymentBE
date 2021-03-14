const express = require("express");

const router = express.Router();

const slittedCoilsController = require("../controllers/slittedCoils");

router.get('/', slittedCoilsController.getCoils)

router.put('/', slittedCoilsController.updateSlits)

// router.post('/', coilsController.postAddCoil)

router.get('/:id', slittedCoilsController.getSingleSlit)

module.exports = router;