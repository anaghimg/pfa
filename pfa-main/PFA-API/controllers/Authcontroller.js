
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');
const Societe = require('../models/Societe');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier d'abord s'il s'agit d'un utilisateur
        const utilisateur = await Utilisateur.findOne({ email });
        if (utilisateur) {
           
                // Générer un jeton JWT pour l'utilisateur
                const token = jwt.sign({ id: utilisateur._id }, 'your_secret_key', { expiresIn: '1h' });
                return res.status(200).json({ token, role: utilisateur.role });
            
        }

        // Si ce n'est pas un utilisateur, vérifier s'il s'agit d'une société
        const societe = await Societe.findOne({ email });
        if (societe) {
         
                const token = jwt.sign({ id: societe._id }, 'your_secret_key', { expiresIn: '1h' });
                return res.status(200).json({ token, role: 'Societe' });
            
        }

        // Si ni l'utilisateur ni la société ne sont trouvés, renvoyer une erreur
        return res.status(404).json({ message: 'Utilisateur ou société non trouvé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};



const registerUtilisateur = async (req, res) => {
  try {
      const { nom, prenom, email, password, role } = req.body;

      // Vérifier si l'utilisateur existe déjà dans la base de données
      const existingUtilisateur = await Utilisateur.findOne({ email });
      if (existingUtilisateur) {
          return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur avec le mot de passe hashé
      const nouvelUtilisateur = new Utilisateur({
          nom,
          prenom,
          email,
          password: hashedPassword, // Utiliser le mot de passe hashé
          role,
      });

      // Enregistrer le nouvel utilisateur dans la base de données
      await nouvelUtilisateur.save();

      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};




const registerSociete = async (req, res) => {
    try {
        const { nom_societe, poste, email, password, adresse,avatar} = req.body;

        // Vérifier si le mot de passe est fourni
        if (!password) {
            return res.status(400).json({ message: 'Le mot de passe est requis' });
        }

        const existingSociete = await Societe.findOne({ email });
        if (existingSociete) {
            return res.status(400).json({ message: 'Cette Societe existe déjà' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Créer un nouvel objet Societe
        const newSociete = new Societe({
            nom_societe,
            poste,
            email,
            password: hashedPassword,
            adresse,
            avatar
        });

        // Si un fichier est téléchargé, enregistrez son chemin dans l'avatar
        if (req.file) {
            newSociete.avatar = req.file.path;
        }

        // Enregistrer le nouvel utilisateur dans la base de données
        await newSociete.save();

        res.status(201).json({ message: 'Societe enregistré avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};



 

module.exports = { login,registerUtilisateur,registerSociete};
