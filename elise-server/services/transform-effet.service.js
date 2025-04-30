const sharp = require('sharp');

async function applyEffects(buffer, effects) {
    let image = sharp(buffer);

    for (const e of effects) {
        if (e.type === 'effet') {
            switch (e.action) {
                case 'rotate':
                    const angle = e.angle;
                    if (!angle) {
                        throw new Error('Angle is required for rotate effect');
                    }
                    image = image.rotate(angle);
                    break;
                case 'ecrasement':
                    const width = e.width || null;
                    const height = e.height || null;
                    image = image.resize(width, height);
                    break;
                case 'mirror':
                    if (e.direction === 'horizontal') {
                        image = image.flop();
                    } else if (e.direction === 'vertical') {
                        image = image.flip();
                    }
                    break;
                case 'kaleidoscope':
                    image = await image
                        .resize(200, 200)
                        .flop()
                        .flip()
                        .rotate(90)
                        .toBuffer();
                    image = sharp(image).flop().flip();
                    break;
                default:
                    throw new Error(`Unknown effect: ${e.action}`);
            }
        }
    }

    return image.toBuffer();
}

module.exports = applyEffects;