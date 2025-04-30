const express = require('express');
require('dotenv').config();
const port = process.env.ELISE_SERVER_PORT;
const app = express();

const transformRoutes = require('./routes/transform-effet.routes');

app.use('/transform-effet', transformRoutes);

app.listen(port, () => {
    console.log(`Elise is running on port : ${port}`);
  });
