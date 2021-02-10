const express = require("express");

const router = express.Router();

const shiftsController = require("../controllers/shifts");

router.get('/', shiftsController.getShifts)

module.exports = router;