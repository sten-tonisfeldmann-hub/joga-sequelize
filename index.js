// Importing necessary modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const connection = require('./db.js');
const articleRoutes = require('./routes/article');
const adminArticleRoutes = require('./routes/admin/article');

// Load environment variables from .env file
dotenv.config();
const app = express(); // Initialize express application
// CORS configuration
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable passing cookies across origins
}));
app.use(express.json()); // Middleware to parse JSON requests
app.use(morgan('dev')); // HTTP request logger

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Joga Sequelize API is running' });
});
app.use('/api/articles', articleRoutes);
app.use('/api/admin/articles', adminArticleRoutes);

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000
// Connect to the database
connection();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green.bold); // Log that the server is running
});