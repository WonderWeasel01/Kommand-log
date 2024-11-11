const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('../routes/userRoutes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || 'localhost';

// CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// API routes først
app.use('/api/users', userRoutes);

// Ret stien til frontend-mappen
const frontendPath = path.join(__dirname, '../../frontend');

// Statiske filer
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
