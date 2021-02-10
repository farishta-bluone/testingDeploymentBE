const express = require("express");

const router = express.Router();

const slittedCoilsController = require("../controllers/slittedCoils");

router.get('/', slittedCoilsController.getCoils)

// router.post('/', coilsController.postAddCoil)

// router.delete('/:id', coilsController.deleteCoil)

module.exports = router;