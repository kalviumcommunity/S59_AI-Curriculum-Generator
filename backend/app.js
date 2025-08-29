// File: backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const zeroShotRoute = require('./routes/zeroShotRoute');

const app = express();

app.use(bodyParser.json());

app.use(zeroShotRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
