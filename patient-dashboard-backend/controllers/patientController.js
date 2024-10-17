const Patient = require('../models/Patient');

// Fetch all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Fetch details of a specific patient
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
