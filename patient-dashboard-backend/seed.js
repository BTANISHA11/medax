const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Authorization = require('./models/Authorization');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');

    // Sample Patient Data
    const patients = [
        {
            name: "John Doe",
            age: 45,
            medicalHistory: "Hypertension",
            treatmentPlan: "Lifestyle changes, medication"
        },
        {
            name: "Jane Smith",
            age: 30,
            medicalHistory: "Asthma",
            treatmentPlan: "Inhaler as needed"
        }
    ];

    // Insert Patients
    Patient.insertMany(patients)
        .then(() => {
            console.log("Patients seeded");
            mongoose.connection.close();
        })
        .catch(err => {
            console.error('Error inserting patients:', err.message);
            mongoose.connection.close();
        });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
