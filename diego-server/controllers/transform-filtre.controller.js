const applyTransformationsFiltre = require('../services/transform-filtre.service');

async function transformImageFiltre(req, res) {
  try {
    const transformations = JSON.parse(req.body.transformations);
    const resultBuffer = await applyTransformationsFiltre(req.file.buffer, transformations);

    res.set('Content-Type', 'image/png');
    res.send(resultBuffer);
  } catch (err) {
    console.error('Error in Diego:', err);
    res.status(500).send('Error processing image');
  }
};

module.exports = transformImageFiltre;
