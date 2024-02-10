const getPORT = require('./config/connectionString.json')
require('./config/db');

const express = require('express');
const app = express();

const PORT = getPORT.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));