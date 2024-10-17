const mongoose = require('mongoose');

const AuthorizationRequestSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    treatment: { type: String, required: true },
    insurancePlan: { type: String, required: true }, // Added field
    dateOfService: { type: Date, required: true }, // Added field
    diagnosisCode: { type: String, required: true }, // Added field
    doctorsNotes: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuthorizationRequest', AuthorizationRequestSchema);