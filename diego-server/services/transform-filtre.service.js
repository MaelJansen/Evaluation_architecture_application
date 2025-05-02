const sharp = require('sharp');

const allowedActions = ['blur', 'sharpen', 'grayscale', 'negate'];

async function applyTransformationsFiltre (buffer, transformations) {
  let image = sharp(buffer);
  const action = transformations.action;

  if (!allowedActions.includes(action)) {
    throw new Error(`Invalid action '${action}'. Allowed actions are: ${allowedActions.join(', ')}`);
  }

  if (transformations.type !== 'filtre') {
    throw new Error(`Invalid type '${transformations.type}'. Only 'filter' is allowed`);
  }

  try {
    switch (action) {
      case 'blur':
        image = image.blur(); break;
      case 'sharpen':
        image = image.sharpen(); break;
      case 'grayscale':
        image = image.grayscale(); break;
      case 'negate':
        image = image.negate(); break;
    }
    return image.toBuffer();

  }catch (e) {
    throw new Error("Error to set filter");
  }

}

module.exports = applyTransformationsFiltre;
