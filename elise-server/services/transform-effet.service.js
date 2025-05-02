const sharp = require('sharp');

const allowedActions = ['rotate', 'ecrasement', 'mirror', 'kaleidoscope'];

async function applyEffects(buffer, effects) {
    let image = sharp(buffer);
    const action = effects.action;

    if (!allowedActions.includes(action)) {
        throw new Error(`Invalid action '${action}'. Allowed actions are: ${allowedActions.join(', ')}`);
    }

    if (effects.type !== 'effet') {
        throw new Error(`Invalid type '${effects.type}'. Only 'filter' is allowed`);
    }

    try {
        switch (action) {
            case 'rotate':
                const angle = effects.angle;
                if (!angle) {
                    throw new Error('Angle is required for rotate effect');
                }
                image = image.rotate(angle);
                break;
            case 'ecrasement':
                const width = effects.width || null;
                const height = effects.height || null;
                image = image.resize(width, height);
                break;
            case 'mirror':
                if (effects.direction === 'horizontal') {
                    image = image.flop();
                } else if (effects.direction === 'vertical') {
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
        }

        return image.toBuffer();

    } catch (e) {
        throw new Error("Error to set effet");
    }
}

module.exports = applyEffects;