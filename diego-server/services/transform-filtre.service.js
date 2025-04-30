const sharp = require('sharp');

async function applyTransformationsFiltre (buffer, transformations) {
  let image = sharp(buffer);

  for (const step of transformations) {
    if (step.type === 'filter') {
      switch (step.action) {
        case 'blur':
          image = image.blur(); break;
        case 'sharpen':
          image = image.sharpen(); break;
        case 'grayscale':
          image = image.grayscale(); break;
        case 'negate':
          image = image.negate(); break;
      }
    }
  }

  return image.toBuffer();
};

module.exports = applyTransformationsFiltre;
