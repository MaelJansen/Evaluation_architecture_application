const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.ELISE_SERVER_PORT;
const app = express();

const transformRoutes = require('./routes/transform-effet.routes');
app.use(express.json());
app.use(cors());
app.use('/effet', transformRoutes);

app.listen(port, () => {
    console.log(`Elise is running on port : ${port}`);
  });
