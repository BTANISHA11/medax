import React, { useState } from 'react';
import { submitAuthorization } from '../api/patientApi'; // Updated path if necessary
import Navbar from './Navbar';

const PriorAuthorizationForm = () => {
    const [formData, setFormData] = useState({
        patientId: '', // Ensure this is a valid ObjectId
        treatment: '',
        insurancePlan: '',
        dateOfService: '',
        diagnosisCode: '',
        doctorsNotes: '',
    });

    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({}); // Reset errors on new input
        setSubmissionError(''); // Clear submission error on new input
        setSuccessMessage(''); // Clear success message on new input
    };

    // Validate the form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.patientId) newErrors.patientId = 'Patient ID is required.';
        else if (!/^[0-9a-fA-F]{24}$/.test(formData.patientId)) newErrors.patientId = 'Invalid Patient ID format.';

        if (!formData.treatment) newErrors.treatment = 'Treatment type is required.';
        if (!formData.insurancePlan) newErrors.insurancePlan = 'Insurance plan is required.';
        if (!formData.dateOfService) newErrors.dateOfService = 'Date of service is required.';
        if (!formData.diagnosisCode) newErrors.diagnosisCode = 'Diagnosis code is required.';
        if (!formData.doctorsNotes) newErrors.doctorsNotes = "Doctor's notes are required.";

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Format the date correctly before submitting
            const formattedData = {
                ...formData,
                dateOfService: new Date(formData.dateOfService).toISOString().split('T')[0], // Format date to YYYY-MM-DD
            };

            // Submit the prior authorization request
            await submitAuthorization(formattedData);
            setFormData({
                patientId: '',
                treatment: '',
                insurancePlan: '',
                dateOfService: '',
                diagnosisCode: '',
                doctorsNotes: '',
            });
            setErrors({});
            setSuccessMessage("Prior Authorization Request Submitted Successfully!"); // Show success message
        } catch (error) {
            console.error("Submission error:", error);
            setSubmissionError(error.response?.data?.message || "Error submitting request. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-6">Prior Authorization Request</h2>

                {/* Success message display */}
                {successMessage && <p className="text-green-500 text-sm italic">{successMessage}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    
                    {/* Submission error message display */}
                    {submissionError && <p className="text-red-500 text-sm italic">{submissionError}</p>}

                    {/* Patient ID */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                            Patient ID
                        </label>
                        <input
                            type="text"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            placeholder="Enter Patient ID (must be a valid ObjectId)"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.patientId ? 'border-red-500' : ''}`}
                        />
                        {errors.patientId && <p className="text-red-500 text-sm italic">{errors.patientId}</p>}
                    </div>

                    {/* Treatment */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment">
                            Treatment
                        </label>
                        <input
                            type="text"
                            name="treatment"
                            value={formData.treatment}
                            onChange={handleChange}
                            placeholder="Enter Treatment Type"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.treatment ? 'border-red-500' : ''}`}
                        />
                        {errors.treatment && <p className="text-red-500 text-sm italic">{errors.treatment}</p>}
                    </div>

                    {/* Insurance Plan */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="insurancePlan">
                            Insurance Plan
                        </label>
                        <input
                            type="text"
                            name="insurancePlan"
                            value={formData.insurancePlan}
                            onChange={handleChange}
                            placeholder="Enter Insurance Plan"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.insurancePlan ? 'border-red-500' : ''}`}
                        />
                        {errors.insurancePlan && <p className="text-red-500 text-sm italic">{errors.insurancePlan}</p>}
                    </div>

                    {/* Date of Service */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfService">
                            Date of Service
                        </label>
                        <input
                            type="date"
                            name="dateOfService"
                            value={formData.dateOfService}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfService ? 'border-red-500' : ''}`}
                        />
                        {errors.dateOfService && <p className="text-red-500 text-sm italic">{errors.dateOfService}</p>}
                    </div>

                    {/* Diagnosis Code */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosisCode">
                            Diagnosis Code
                        </label>
                        <input
                            type="text"
                            name="diagnosisCode"
                            value={formData.diagnosisCode}
                            onChange={handleChange}
                            placeholder="Enter Diagnosis Code"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.diagnosisCode ? 'border-red-500' : ''}`}
                        />
                        {errors.diagnosisCode && <p className="text-red-500 text-sm italic">{errors.diagnosisCode}</p>}
                    </div>

                    {/* Doctor's Notes */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorsNotes">
                            Doctor's Notes
                        </label>
                        <textarea
                            name="doctorsNotes"
                            value={formData.doctorsNotes}
                            onChange={handleChange}
                            placeholder="Enter Doctor's Notes"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.doctorsNotes ? 'border-red-500' : ''}`}
                        />
                        {errors.doctorsNotes && <p className="text-red-500 text-sm italic">{errors.doctorsNotes}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit Prior Authorization Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PriorAuthorizationForm;
