const { response } = require('express');
const Utilisateur = require('../models/Utilisateur');


const index = (req,res,next)=>{
  Utilisateur.find().then(response=>{
    res.json({
      response
    })
  }).catch(errors=>{
    res.json({
      message:'error'
    })
  })
} 
const show = (req,res,next)=>{
  let utilisateurID = req.body.utilisateurID
  Utilisateur.findById(utilisateurID).then(response=>{
    res.json({
      response
    })
  }).catch(errors=>{
    res.json({
      message:'error'
    })
  })
}
const store = (req, res, next) => {
  // Create a new instance of Utilisateur using the data from the request
  const utilisateur = new Utilisateur({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    createdAt: req.body.createdAt
  });

  // Save the new utilisateur to the database
  utilisateur.save()
    .then(savedUtilisateur => {
      res.status(201).json({ utilisateur: savedUtilisateur });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const update = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const updatedData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      createdAt: req.body.createdAt
    };

    const response = await Utilisateur.findByIdAndUpdate(_id, { $set: updatedData });
    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const destroy = (req, res, next) => {
  let _id = req.body._id;
  Utilisateur.findOneAndDelete({ _id: _id })
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

module.exports={index,show,store,update,destroy}