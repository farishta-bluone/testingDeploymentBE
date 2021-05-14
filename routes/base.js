const express = require("express");

const router = express.Router();

const basesController = require("../controllers/bases");

router.get('/', basesController.getBases)

module.exports = router;