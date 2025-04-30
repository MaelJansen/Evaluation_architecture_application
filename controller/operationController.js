const Operation = require("../models/operation");

const saveOperation = async (req, res) => {
  const { type, idUtilisateur } = req.body;

  try {
    const newOperation = await Operation.create({ type, idUtilisateur });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { saveOperation };
