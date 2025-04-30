const applyEffects = require('../services/transform-effet.service');

async function transformEffetImage(req, res) {
  try {
    console.log('Received file:', req.body);
    const transformations = JSON.parse(req.body.effets);
    console.log('Transformations:', transformations);
    const resultBuffer = await applyEffects(req.file.buffer, transformations);

    res.set('Content-Type', 'image/png');
    res.send(resultBuffer);
  } catch (err) {
    console.error('Error in Elise:', err);
    res.status(500).send(err.message);
  }
};

module.exports = transformEffetImage;
