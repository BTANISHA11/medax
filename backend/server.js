// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Patient = require('./models/Patient');
const AuthorizationRequest = require('./models/AuthorizationRequest');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/patientData', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Fetch all patients
app.get('/api/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        if (patients.length === 0) {
            return res.status(404).json({ message: "No patients found. You can add a new patient." });
        }
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new patient
app.post('/api/patients', async (req, res) => {
    const { name, age, medicalHistory, treatmentPlan } = req.body;

    const newPatient = new Patient({
        name,
        age,
        medicalHistory,
        treatmentPlan
    });

    try {
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Inside your Express server file
app.post('/api/authorization-requests', async (req, res) => {
    const { patientId, treatment, insurancePlan, dateOfService, diagnosisCode, doctorsNotes } = req.body;

    const newRequest = new AuthorizationRequest({
        patientId,
        treatment,
        insurancePlan,
        dateOfService,
        diagnosisCode,
        doctorsNotes
    });

    try {
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// List all authorization requests
app.get('/api/authorization-requests', async (req, res) => {
    try {
        const requests = await AuthorizationRequest.find().populate('patientId');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});