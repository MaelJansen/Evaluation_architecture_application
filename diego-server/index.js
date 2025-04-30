const express = require('express');
require('dotenv').config();
const port = process.env.DIEGO_SERVER_PORT;
const app = express();

const transformRoutes = require('./routes/transform-filtre.routes');

app.use('/transform-filtre', transformRoutes);

app.listen(port, () => {
    console.log(`Diego is running on port : ${port}`);
  });
