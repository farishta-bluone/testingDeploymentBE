const express = require("express");

const router = express.Router();

const coilsController = require("../controllers/coils");

router.post('/', coilsController.postAddCoil)

module.exports = router;