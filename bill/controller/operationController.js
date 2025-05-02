require('dotenv').config();
const Operation = require("../models/operation");
const { saveOperationAndSendImage } = require("../services/images.service");


const CLAIREPORT = 8080;
const PORTDIEGO = process.env.DIEGO_SERVER_PORT;
const PORTELISE = process.env.ELISE_SERVER_PORT;

const saveOperation = async (req, res) => {
  const imageId = req.params.imageId;
  const imagePath = req.file.path;

  const image = await saveOperationAndSendImage({...req.body, imagePath, imageId});
  if (!image) {
    return res.status(401).json({ message: "Image not found" });
  }
  res.set('Content-Type', 'image/png');
  res.status(200)
  return res.send(image);

};

const applyOperation = async (req, res) => {
  const { imageId } = req.body;
  

  try {
    const operation = Operation.findOne({
      where: {
        imageId: imageId,
      },
    });

    if (!operation) {
      return res.status(401).json({ message: "No operation foud for this image" });
    }

    // const image = await fetch("http://localhost:" + CLAIREPORT + "/images/" + imageId, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     transformation:
    //   })
    // })
    //   .then((rep) => rep.json())
    //   .then((data) => data);
    // if (!image) {
    //   return res.status(401).json({ message: "Image not found" });
    // }

    const data = {
      transformation: operation,
      image: image,
    };

    const imageModifiee = await fecth("http://localhost:" + (operation.type == "filtre" ? PORTDIEGO : PORTELISE) + "/images/" + imageId + "/transform", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((rep) => rep.json())
      .then((data) => data);

    if (!imageModifiee) {
      return res.status(401).json({ message: "Error occured with the modifications" });
    }

    return res.status(200).json(imageModifiee);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { saveOperation, applyOperation };
