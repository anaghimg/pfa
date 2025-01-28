const { response } = require('express');
const Societe = require('../models/Societe'); 
const path = require('path');

const index = (req, res, next) => {
  Societe.find()
    .then(response => {
      res.json({
        response
      });
    })
    .catch(errors => {
      res.json({
        message: 'error'
      });
    });
};
const findOne = (req, res, next) => {
  let societeID = req.params.id; // Récupérer l'ID de la société à partir des paramètres de l'URL
  Societe.findById(societeID)
    .then(response => {
      if (!response) {
        return res.status(404).json({ message: 'Societe not found' });
      }
      res.json({ response });
    })
    .catch(errors => {
      console.error(errors);
      res.status(500).json({ message: 'Internal server error' });
    });
};



const store = (req, res, next) => {
  // Create a new instance of Societe using the data from the request
  const newSociete = new Societe({
    nom_societe: req.body.nom_societe, // Ensure that you're providing the value for nom_societe
    poste: req.body.poste, // Ensure that you're providing the value for poste
    email: req.body.email,
    password: req.body.password,
    adresse: req.body.adresse,
  });
  if (req.file) {
    newSociete.avatar = req.file.path;
  }

  newSociete.save()
    .then(savedSociete => {
      res.status(201).json({ societe: savedSociete });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params; // Get ID from URL params
    const updatedData = {
      nom_societe: req.body.nom_societe,
      poste: req.body.poste,
      email: req.body.email,
      password: req.body.password,
      adresse: req.body.adresse,
    };

    const response = await Societe.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
    if (!response) {
      return res.status(404).json({ message: 'Société not found' });
    }

    return res.json({ response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const destroy = async (req, res, next) => {
  try {
    const { id } = req.params; // Get ID from URL params

    const deletedSociete = await Societe.findByIdAndDelete(id);
    if (!deletedSociete) {
      return res.status(404).json({ message: 'Société not found' });
    }

    res.json({ message: 'Société deleted successfully', deletedSociete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { index, store, update, destroy,findOne };
