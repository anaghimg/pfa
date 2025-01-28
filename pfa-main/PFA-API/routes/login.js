const express = require('express');
const router = express.Router();
const authController = require('../controllers/Authcontroller');





router.post('/LU', authController.login);




module.exports = router;
