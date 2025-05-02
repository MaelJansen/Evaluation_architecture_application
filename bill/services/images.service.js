const fs = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const FormData = require('form-data')
const Operation = require("../models/operation");

const PORTDIEGO = process.env.DIEGO_SERVER_PORT;
const PORTELISE = process.env.ELISE_SERVER_PORT;

async function saveOperationAndSendImage(option) {
    const { type, idUtilisateur, parameters, imageId, imagePath } = option;
    if (type !== "filtre" && type !== "effet") {
        throw new Error("Type must be 'filtre' or 'effet'")
    }
    try {
        let operation, image;
        const existingOperation = await Operation.findOne({
            where: {idUtilisateur, imageId, type}
        });
        if (existingOperation) {
            existingOperation.parameters = parameters;
            operation = (await existingOperation.save()).toJSON();
        } else {
            operation = (await Operation.create({ type, idUtilisateur, parameters, imageId, imagePath })).toJSON();
        }
        if (operation) {
            const pathTransform = operation.type === "filtre" ? `${PORTDIEGO}/filtre` : `${PORTELISE}/effet`;
            image = await saveTransformation(operation, JSON.parse(parameters), pathTransform);
        }
        return image;
        
      } catch (err) {
        throw new Error("Error creating operation: " + err.message);
      }
}

async function saveTransformation(image, parameters, pathTransform) {
    try {
        const form = new FormData();
        const absoluteImagePath = path.resolve(image.imagePath);
        form.append('image', fs.createReadStream(absoluteImagePath));
        const transformations = {
            ...parameters,
            type: image.type
        }
        form.append('transformations', JSON.stringify(transformations));

        const response = await axios.post(`http://localhost:${pathTransform}`, form, {
            headers: form.getHeaders(),
            responseType: 'arraybuffer'
        });

        fs.writeFileSync(absoluteImagePath, response.data);
        return response.data;
    }catch(err) {
        throw new Error("Error transforming image: " + err.message);
    }
}

module.exports = { saveOperationAndSendImage };