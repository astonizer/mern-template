const express = require('express');

const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Importing all routes
const authRoutes = require('./routes/authRoutes');

// Environment variables
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Database connection
connectDB();

// Authentication routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
