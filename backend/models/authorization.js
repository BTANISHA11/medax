const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // References the Patient model
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    doctorsNotes: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    dateOfService: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Authorization', authorizationSchema);
