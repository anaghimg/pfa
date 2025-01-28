const multer = require('multer');
const path = require('path');

// Définir les types de fichiers autorisés
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Nom du fichier
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: imageFileFilter
});

module.exports = upload;
