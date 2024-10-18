const express = require('express');
const { getPatients, addPatient } = require('../controllers/patientController');

const router = express.Router();

// GET Request - Fetch all patients
router.get('/', getPatients);

// POST Request - Add a new patient
router.post('/', addPatient);

module.exports = router;
