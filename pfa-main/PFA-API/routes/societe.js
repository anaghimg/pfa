const express = require('express');
const router = express.Router();
const societeController = require('../controllers/societeController')
const upload = require('../middleware/upload')
// Create a new Utilisateur
router.get('/', societeController.index);

router.get('/:id', societeController.findOne);


// Get a single Utilisateur by ID
router.post('/store', upload.single('avatar'),societeController.store);

// Update a Utilisateur by ID
router.put('/update/:id', societeController.update);
router.delete('/delete/:id', societeController.destroy);


module.exports = router;
