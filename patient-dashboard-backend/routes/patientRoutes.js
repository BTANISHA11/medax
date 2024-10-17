const express = require('express');
// const { getAllPatients, getPatientById } = require('../controllers/patientController');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const patientController = require('../controllers/patientController');

// // Get all patients (protected route)
// router.get('/', authMiddleware, patientController.getAllPatients);
// // Get all patients
// router.get('/', authMiddleware, getAllPatients);

// // Get a specific patient by ID
// router.get('/:id', authMiddleware, getPatientById);

// module.exports = router;

