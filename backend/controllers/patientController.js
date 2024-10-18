const Patient = require('../models/patient');

// Get all patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new patient
const addPatient = async (req, res) => {
    try {
        const { name, age, medicalHistory, treatmentPlan } = req.body;

        const patient = new Patient({
            name,
            age,
            medicalHistory,
            treatmentPlan
        });

        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPatients, addPatient };
