const applyEffects = require('../services/transform-effet.service');

async function transformEffetImage(req, res) {
  try {
    const transformations = JSON.parse(req.body.effets);
    const resultBuffer = await applyEffects(req.file.buffer, transformations);

    res.set('Content-Type', 'image/png');
    res.send(resultBuffer);
  } catch (err) {
    console.error('Error in Elise:', err);
    res.status(500).send(err.message);
  }
};

module.exports = transformEffetImage;
