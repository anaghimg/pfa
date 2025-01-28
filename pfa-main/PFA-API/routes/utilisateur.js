const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/UtilisateurController');

// Routes for CRUD operations on Utilisateur model

// Create a new Utilisateur
router.get('/', utilisateurController.index);

// Get all Utilisateurs
router.post('/show', utilisateurController.show);

// Get a single Utilisateur by ID
router.post('/store', utilisateurController.store);

// Update a Utilisateur by ID
router.put('/update', utilisateurController.update);

// Delete a Utilisateur by ID
router.delete('/delete', utilisateurController.destroy);

module.exports = router;
