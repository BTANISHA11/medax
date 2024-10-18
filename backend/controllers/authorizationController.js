const Authorization = require('../models/authorization'); // Adjust the path if necessary
const Patient = require('../models/patient'); // Ensure you have the Patient model

// POST endpoint to submit a prior authorization request
const addAuthorization = async (req, res) => {
    const { patientId, treatment, doctorsNotes, dateOfService } = req.body;

    // Validate that the patient exists
    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Create and save the new authorization request
        const newAuthorization = new Authorization({
            patientId,
            treatment,
            doctorsNotes,
            dateOfService,
        });

        await newAuthorization.save();
        return res.status(201).json(newAuthorization); // Respond with the created authorization
    } catch (error) {
        console.error('Error creating authorization:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// GET endpoint to fetch all authorization requests (optional, adjust based on your needs)
const getAuthorizations = async (req, res) => {
    try {
        const authorizations = await Authorization.find().populate('patientId'); // Populate patient data if needed
        return res.status(200).json(authorizations);
    } catch (error) {
        console.error('Error fetching authorizations:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { addAuthorization, getAuthorizations }; // Export the functions for use in routes