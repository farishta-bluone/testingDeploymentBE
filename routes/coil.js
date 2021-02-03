const express = require("express");

const router = express.Router();

const coilsController = require("../controllers/coils");

router.get('/list', coilsController.getCoils)

router.post('/', coilsController.postAddCoil)

router.delete('/:id', coilsController.deleteCoil)

router.put('/:id', coilsController.updateCoil)

router.get('/:id/slits', coilsController.getSlits)

module.exports = router;