const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    medicalHistory: {
        type: String,
        required: false
    },
    treatmentPlan: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);