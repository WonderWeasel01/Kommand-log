// backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createAdminUser } from './models/User.js';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import apiRoutes from './routes/apiRoutes.js';
import { swaggerUi, specs } from './config/swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || 'localhost';

// Middleware
app.use(express.json());
app.use(cors());

// Call createAdminUser to initialize admin on startup
createAdminUser();

// Use routes
app.use('/api', apiRoutes);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Error handling middleware
app.use(errorHandler);

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`App listening at http://${HOST}:${PORT}`);
});