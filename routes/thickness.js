const express = require("express");

const router = express.Router();

const thicknessesController = require("../controllers/thicknesses");

router.get('/', thicknessesController.getThicknesses)

router.post('/', thicknessesController.postAddThickness)

// router.put('/:id', companiesController.updateCompany)

// router.delete('/:id', companiesController.deleteCompany)

module.exports = router;