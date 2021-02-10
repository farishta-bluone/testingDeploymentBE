const express = require("express");

const router = express.Router();

const companiesController = require("../controllers/companies");

router.get('/', companiesController.getCompanies)

router.post('/', companiesController.postAddCompany)

router.put('/:id', companiesController.updateCompany)

router.delete('/:id', companiesController.deleteCompany)

module.exports = router;