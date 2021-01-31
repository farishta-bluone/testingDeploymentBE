const express = require("express");

const router = express.Router();

const coilsController = require("../controllers/coils");

router.get('/', coilsController.getCoils)

module.exports = router;