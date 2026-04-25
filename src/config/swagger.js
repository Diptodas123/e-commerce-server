import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'REST API documentation for the e-commerce server',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'development server' },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'token',
                },
            },
        },
        security: [{ cookieAuth: [] }],
    },
    apis: ['./src/routes/**/*.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
