// registerSociete.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/Authcontroller');
const upload = require('../middleware/upload');

router.post('/RS', upload.single('avatar'), authController.registerSociete);

module.exports = router;
