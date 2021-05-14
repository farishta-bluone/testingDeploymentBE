const express = require("express");

const router = express.Router();

const furnaceController = require("../controllers/furnaces");

router.get('/', furnaceController.getFurnaces)

module.exports = router;