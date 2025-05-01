const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.DIEGO_SERVER_PORT;
const app = express();

const transformRoutes = require('./routes/transform-filtre.routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/filtre', transformRoutes);

app.listen(port, () => {
    console.log(`Diego is running on port : ${port}`);
  });

  