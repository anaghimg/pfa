const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Utilisateur model
const societeSchema = new Schema({
  nom_societe: {
    type: String,
    required: true,
    unique: true
  },
  poste: {
    type: String,
    required: true,
  
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,

  },
  avatar:{
    type: String
  },
  adresse:{
    type: String,
  },
} , {timestamps:true});

// Create a Utilisateur model using the schema
const societe = mongoose.model('societe', societeSchema);

// Export the Utilisateur model
module.exports = societe;
