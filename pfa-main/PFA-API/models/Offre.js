const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offreSchema = new Schema({
  titre: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  societe: {
    type: Schema.Types.ObjectId,
    ref: 'societe' 
  },
  dateExp: {
    type: Date,
    default: Date.now
  }
});

const offre = mongoose.model('offre', offreSchema);

module.exports = offre;
