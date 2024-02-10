const getConnection = require('./connectionString.json');

const mongo_URI = getConnection.Mongo_URI;

const mongoose = require('mongoose');

mongoose.connect(mongo_URI)
.then(() => console.log('Connected to Mongo Atlas'))
.catch((error) => console.error("Connection failed", error));