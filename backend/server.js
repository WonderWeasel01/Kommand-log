// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createAdminUser } = require('./models/User');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./routes/apiRoutes');
const { swaggerUi, specs } = require('./config/swagger');

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