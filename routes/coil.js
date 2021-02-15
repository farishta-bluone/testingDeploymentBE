const express = require("express");

const router = express.Router();

const coilsController = require("../controllers/coils");

router.get('/', coilsController.getCoils)

router.post('/', coilsController.postAddCoil)

router.delete('/:id', coilsController.deleteCoil)

router.put('/:id', coilsController.updateCoil)

router.post('/:id/slits', coilsController.postAddSlits)

router.get('/:id/slits', coilsController.getSlits)

router.put('/:id/slits', coilsController.updateSlits)

router.delete('/:id/slits', coilsController.deleteSlits)



module.exports = router;