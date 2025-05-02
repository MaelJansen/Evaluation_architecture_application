const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const nameFile = file.originalname.split('.')
    const imageId = req.params.imageId;
    const userId = req.params.idUtilisateur;
    cb(null, imageId  + "-" + userId + "-" + nameFile[0] + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const uploadImage = multer({ storage: storageImage });

module.exports = {upload, uploadImage};