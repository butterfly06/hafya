import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HAFYA API',
      version: '1.0.0',
      description: 'Documentation API HAFYA',
    },
    servers: [
      {
        url: 'http://localhost:5002',
        description: 'Serveur local',
      },
    ],
  },

  apis: ['./config/routes/*.js'],

  failOnErrors: true,
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;