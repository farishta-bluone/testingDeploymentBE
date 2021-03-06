const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

// router.get('/', authController.getUsers)

router.post('/', authController.validateUser)

// router.put('/:id', authController.updateUser)

// router.delete('/:id', authController.deleteUser)

module.exports = router;