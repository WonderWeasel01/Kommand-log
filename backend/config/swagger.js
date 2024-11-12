import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Military API',
      version: '1.0.0',
      description: 'API documentation for the Military API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: [
    path.join('backend/routes/apiRoutes.js'), 
    path.join('backend/models/User.js')
  ], 
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
