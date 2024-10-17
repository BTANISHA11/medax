// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const AuthorizationRequest = require('../models/AuthorizationRequest');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new patient
router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    try {
        const savedPatient = await patient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Manage Authorization Requests
router.post('/authorize', async (req, res) => {
    const request = new AuthorizationRequest(req.body);
    try {
        const savedRequest = await request.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// List Authorization Requests
router.get('/authorize', async (req, res) => {
    try {
        const requests = await AuthorizationRequest.find().populate('patientId');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;