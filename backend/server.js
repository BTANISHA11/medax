const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authsRoutes = require('./routes/authsRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/authorization', authRoutes); // Authorization routes
app.use('/api/patients', patientRoutes);   // Patient-related routes
app.use('/api/auths', authsRoutes);         // Authentication routes (fixed typo)

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
