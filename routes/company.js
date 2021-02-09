const express = require("express");

const router = express.Router();

const companiesController = require("../controllers/companies");

router.get('/', companiesController.getCompanies)

router.post('/', companiesController.postAddCompany)

// router.delete('/:id', coilsController.deleteCoil)

module.exports = router;