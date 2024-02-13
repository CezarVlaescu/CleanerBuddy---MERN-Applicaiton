const getPORT = require('./config/config.json')
require('./config/db');

const cityRoutes = require('./routes/citiesRoutes.js'); 
const companyRoutes = require('./routes/companiesRoutes.js'); 

const cors = require('cors');

// Swagger 

//const swaggerUI = require('swagger-ui-express');
//const swaggerSpec = require('./middlewares/swagger.js')

// Express 

const express = require('express');
const app = express();

app.use(cors()); // enable Cross Origin Resource Sharing (CORS)
app.use(express.json()); // middleware for parsing json bodies
app.use(express.static('public')); // this middleware is just optional for static files

//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // setting swagger UI for testing routes

app.use('/api/cities', cityRoutes); // Using of city routes
app.use('/api/companies', companyRoutes); // Using companies routes

const PORT = getPORT.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));