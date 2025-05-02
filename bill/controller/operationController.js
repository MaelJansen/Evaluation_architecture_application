require('dotenv').config();
const Operation = require("../models/operation");
const { saveOperationAndSendImage, getImage } = require("../services/images.service");


const CLAIREPORT = 8080;
const PORTDIEGO = process.env.DIEGO_SERVER_PORT;
const PORTELISE = process.env.ELISE_SERVER_PORT;

const saveOperation = async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const body = {
      ...req.body,
      idUtilisateur: req.params.idUtilisateur
    }
    const imagePath = req.file.path;
    const image = await saveOperationAndSendImage({...body, imagePath, imageId});
    if (!image) {
      return res.status(401).json({message: "Image not found"});
    }
    res.set('Content-Type', 'image/png');
    res.status(200)
    return res.send(image);
  }catch (e) {
    return res.status(500).json({ message: "Error to modify image" });
  }
};

const applyOperation = async (req, res) => {
  const imageId = req.params.imageId;
  const idUtilisateur = req.params.idUtilisateur;
  try {
    const image = await getImage(imageId, idUtilisateur);

    res.set('Content-Type', 'image/png');
    res.status(200)
    return res.send(image);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { saveOperation, applyOperation };
