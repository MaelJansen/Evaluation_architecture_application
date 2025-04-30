const Operation = require("../models/operation");

const saveOperation = async (req, res) => {
  const imageId = req.params.imageId;

  /*
  const image = await fetch("http:/:localhost:" + CLAIREPORT + "/images/" + imageId)
    .then((rep) => rep.json())
    .then((data) => data);
  if (!image){
    return res.status(401).json({message: "Image not found"});
  }
  */
  const { type, idUtilisateur, parameters } = req.body;

  if (type != "filtre" && type != "effet") {
    return res.status(401).json({ message: "Type must be 'filtre' or 'effet'" });
  }

  /*
  const user = await User.findByPk(idUtilisateur);
  if (!user){
    return res.status(401).json({message: "User not found"});
  }
  */

  try {
    const newOperation = await Operation.create({ type, idUtilisateur, parameters, imageId });
    return res.status(201).json(newOperation);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const applyOperation = async (req, res) => {
  const { imageId } = req.body;
  const CLAIREPORT = 8080;
  const PORTDIEGO = 8000;
  const PORTELISE = 8001;

  try {
    const operation = Operation.findOne({
      where: {
        imageId: imageId,
      },
    });

    if (!operation) {
      return res.status(401).json({ message: "No operation foud for this image" });
    }

    const image = await fetch("http://localhost:" + CLAIREPORT + "/images/" + imageId)
      .then((rep) => rep.json())
      .then((data) => data);
    if (!image) {
      return res.status(401).json({ message: "Image not found" });
    }

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
