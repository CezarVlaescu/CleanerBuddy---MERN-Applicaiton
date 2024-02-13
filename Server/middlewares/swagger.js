const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'Cleaner API',
        version: '1.0.0',
        description: 'API Description'
    }
}

const options = {
    swaggerDef,
    apis: ['../routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;