const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { ObjectId } = require('mongoose').Types;
const sendNodemailer = require('./sendNodemailer');


const cors = require('cors'); // Importez le module CORS
const jwt = require('jsonwebtoken');
const Societe = require('./models/Societe');
const Offre = require('./models/Offre');
const upload = require('./middleware/upload')

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const UtilisateurRoute = require('./routes/utilisateur');
const OffreRoute = require('./routes/offre');
const SocieteRoute = require('./routes/societe');
const Utilisateur = require('./models/Utilisateur');
const registerSocieteRoute = require('./routes/registerSociete');



mongoose.connect('mongodb://127.0.0.1:27017/gestionEmploi')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
});
db.once('open', () => {
  console.log('db connected');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisez CORS pour autoriser toutes les demandes provenant de localhost:3000
app.use(cors());

const router = express.Router(); // Define router here

// Set up port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  jwt.verify(token.split(' ')[1], 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    if (decoded.role === 'Societe' && !decoded.companyId) {
      return res.status(401).json({ message: 'Company ID not provided in token' });
    }
    req.decoded = decoded; // Store the decoded token in the request object for later use

    // Move the code that uses decoded here
    Utilisateur.findById(decoded.id)
      .then(user => {
        if (!user) {
          Societe.findById(decoded.companyId)
            .then(societe => {
              if (!societe) {
                return res.status(404).json({ message: 'User or company not found' });
              }
              req.societe = societe;
              next();
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Internal server error' });
            });
        } else {
          req.user = user;
          next();
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
};


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Utilisateur.findOne({ email });
    let role = 'Utilisateur';
    let societeId = null;

    if (!user) {
      user = await Societe.findOne({ email });
      role = 'Societe';
      if (user) {
        societeId = user._id;
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur ou société non trouvé' });
    }

    if (!password) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id, companyId: societeId }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token, role, societeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});
app.get('/api/societe', (req, res) => {
  const { name, address } = req.query;

  let query = {};

  if (name) {
    query.nom_societe = { $regex: name, $options: 'i' };
  }

  if (address) {
    query.adresse = { $regex: address, $options: 'i' };
  }

  Societe.find(query)
    .then(societes => {
      res.json({ societes });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.get('/user-role', verifyToken, (req, res) => {
  let role = 'Utilisateur';

  if (req.societe) {
    role = 'Societe';
  } else if (req.user) {
    role = req.user.role; // Assuming the role is stored in the user object
  }

  res.json({ role });
});




app.post("/api/registerSociete", upload.single("avatar"), (req, res) => {
  const formData = {
    ...req.body,
    avatar: req.file.path,
  };
  Societe.create(formData)
    .then(societe => res.json(societe))
    .catch(err => res.json(err));
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});



app.get('/api/offre', verifyToken, async (req, res) => {
  try {
    let societeId = req.query.societe;

    // Check if societe ID is provided
    if (!societeId) {
      return res.status(400).json({ message: 'Societe ID is required' });
    }

    // Vérifiez si l'ID de la société est un ObjectID valide
    if (!mongoose.Types.ObjectId.isValid(societeId)) {
      return res.status(400).json({ message: 'Invalid societe ID' });
    }

    // Fetch offers based on societe ID
    const offres = await Offre.find({ societe: societeId });

    res.status(200).json({ offres });
  } catch (err) {
    console.error('Error fetching offres:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post("/api/offre", verifyToken, (req, res) => {

  if (!req.societe) {
    return res.status(403).json({ message: 'Vous devez être une société pour ajouter une offre' });
  }

  const newOffre = new Offre({
    titre: req.body.titre,
    description: req.body.description,
    societe: req.societe._id,
    dateExp: req.body.dateExp
  });

  newOffre.save()
    .then(savedOffre => {

      res.status(201).json({ offre: savedOffre });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur lors de lajout de offre' });
    });
});

router.put('/offre/update', async (req, res, next) => {
  try {
    const _id = req.params.id; // Utilisez req.params pour récupérer l'ID de l'offre
    const updatedData = {
      titre: req.body.titre,
      description: req.body.description,
      societe: req.body.societe,
      dateExp: req.body.dateExp
    };

    const response = await Offre.findByIdAndUpdate(_id, { $set: updatedData }, { new: true })
                                  .populate('societe', 'nom_societe'); // Populate seulement le nom_societe de la société
    if (!response) {
      return res.status(404).json({ message: 'Offre not found' });
    }

    return res.json({ offre: response }); // Renvoie l'offre mise à jour avec le nom de la société
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/societe', verifyToken, (req, res) => {

  const societeId = req.query.id;


  if (!mongoose.Types.ObjectId.isValid(societeId)) {
    return res.status(400).json({ message: 'Invalid societe ID' });
  }


  Societe.findById(societeId)
    .then(societe => {
      if (!societe) {
        return res.status(404).json({ message: 'Société non trouvée' });
      }

      res.status(200).json(societe);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    });
});




app.post('/api/register', upload.none(), (req, res) => {
  const { nom, prenom, email, password, role } = req.body;
  
  const newUtilisateur = new Utilisateur({ nom, prenom, email, password, role });
  newUtilisateur.save()
    .then(utilisateur => res.json(utilisateur))
    .catch(err => res.status(500).json(err));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log("An error occurred:", err); // Ajout du console.log
  res.status(500).json({ message: 'Internal server error' });
});



app.use('/uploads', express.static('uploads'))
app.use('/api/utilisateur', UtilisateurRoute);
app.use('/api/offre', OffreRoute);

app.use('/api/societe', SocieteRoute);
app.use('/api/register', registerRoute);
app.use('/api/registerSociete', registerSocieteRoute);
app.use('/api/login', loginRoute);
app.use('/api', router); // Mount router here

