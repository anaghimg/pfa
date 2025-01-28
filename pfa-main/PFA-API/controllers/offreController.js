const { response } = require('express');
const Offre = require('../models/Offre');

const index = (req, res, next) => {
  Offre.find()
    .populate('societe', 'nom_societe') // Populate seulement le nom_societe de la société
    .then(offres => {
      res.json({ offres }); // Renvoie la liste d'offres avec le nom de la société
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const show = (req, res, next) => {
  let offreID = req.params.offreID; // Utilisez req.params pour récupérer l'ID de l'offre
  Offre.findById(offreID)
    .populate('societe', 'nom_societe') // Populate seulement le nom_societe de la société
    .then(offre => {
      res.json({ offre }); // Renvoie les détails de l'offre avec le nom de la société
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const store = (req, res, next) => {
  const newOffre = new Offre({
    titre: req.body.titre,
    description: req.body.description,
    societe: req.body.societe,
    dateExp: req.body.dateExp
  });

  newOffre.save()
    .then(savedOffre => {
      res.status(201).json({ offre: savedOffre }); // Renvoie la nouvelle offre avec le nom de la société
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const update = async (req, res, next) => {
  try {
      const offreID = req.params.offreID;
      const updatedData = {
          titre: req.body.titre,
          description: req.body.description,
          societe: req.body.societe,
          dateExp: req.body.dateExp
      };

      const response = await Offre.findByIdAndUpdate(offreID, { $set: updatedData }, { new: true })
                                  .populate('societe', 'nom_societe');

      if (!response) {
          return res.status(404).json({ message: 'Offre not found' });
      }

      return res.json({ offre: response });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

const destroy = (req, res, next) => {
  let offreID = req.params.offreID;
  Offre.findByIdAndDelete(offreID)
      .then(response => {
          if (!response) {
              return res.status(404).json({ message: 'Offre not found' });
          }
          res.json({ message: 'Offre deleted successfully' });
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
      });
};


module.exports = { index, show, store, update, destroy };
