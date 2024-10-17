import React, { useState } from 'react';
import { submitAuthorization } from '../api/patientApi';
import Navbar from './Navbar';

const PriorAuthorizationForm = () => {
    const [formData, setFormData] = useState({
        patientId: '', // Ensure this is a valid ObjectId
        treatment: '',
        insurancePlan: '',
        dateOfService: '',
        diagnosisCode: '',
        doctorsNotes: '', // Ensure this field is included
    });

    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSubmissionError(''); // Clear submission error when user types
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.patientId) newErrors.patientId = 'Patient ID is required.';
        else if (!/^[0-9a-fA-F]{24}$/.test(formData.patientId)) newErrors.patientId = 'Invalid Patient ID format.';

        if (!formData.treatment) newErrors.treatment = 'Treatment type is required.';
        if (!formData.insurancePlan) newErrors.insurancePlan = 'Insurance plan is required.';
        if (!formData.dateOfService) newErrors.dateOfService = 'Date of service is required.';
        if (!formData.diagnosisCode) newErrors.diagnosisCode = 'Diagnosis code is required.';
        if (!formData.doctorNotes) newErrors.doctorNotes = 'Doctor\'s notes are required.';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const formattedData = {
                ...formData,
                dateOfService: new Date(formData.dateOfService).toISOString().split('T')[0], // Format date to YYYY-MM-DD
            };

            await submitAuthorization(formattedData);
            // Reset form or handle success
            setFormData({
                patientId: '',
                treatment: '',
                insurancePlan: '',
                dateOfService: '',
                diagnosisCode: '',
                doctorsNotes: '',
            });
            setErrors({});
            alert("Prior Authorization Request Submitted Successfully!");
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
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {submissionError && <p className="text-red-500 text-xs italic">{submissionError}</p>}
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                            Patient ID
                        </label>
                        <input
                            type="text"
                            name="patientId"
                            onChange={handleChange}
                            value={formData.patientId}
                            placeholder="Enter Patient ID (must be a valid ObjectId)"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.patientId ? 'border-red-500' : ''}`}
                        />
                        {errors.patientId && <p className="text-red-500 text-xs italic">{errors.patientId}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment">
                            Treatment
                        </label>
                        <input
                            type="text"
                            name="treatment"
                            onChange={handleChange}
                            value={formData.treatment}
                            placeholder="Enter Treatment Type"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.treatment ? 'border-red-500' : ''}`}
                        />
                        {errors.treatment && <p className="text-red-500 text-xs italic">{errors .treatment}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="insurancePlan">
                            Insurance Plan
                        </label>
                        <input
                            type="text"
                            name="insurancePlan"
                            onChange={handleChange}
                            value={formData.insurancePlan}
                            placeholder="Enter Insurance Plan"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.insurancePlan ? 'border-red-500' : ''}`}
                        />
                        {errors.insurancePlan && <p className="text-red-500 text-xs italic">{errors.insurancePlan}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfService">
                            Date of Service
                        </label>
                        <input
                            type="date"
                            name="dateOfService"
                            onChange={handleChange}
                            value={formData.dateOfService}
                            placeholder="Enter Date of Service"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dateOfService ? 'border-red-500' : ''}`}
                        />
                        {errors.dateOfService && <p className="text-red-500 text-xs italic">{errors.dateOfService}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnosisCode">
                            Diagnosis Code
                        </label>
                        <input
                            type="text"
                            name="diagnosisCode"
                            onChange={handleChange}
                            value={formData.diagnosisCode}
                            placeholder="Enter Diagnosis Code"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.diagnosisCode ? 'border-red-500' : ''}`}
                        />
                        {errors.diagnosisCode && <p className="text-red-500 text-xs italic">{errors.diagnosisCode}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorsNotes">
                            Doctor's Notes
                        </label>
                        <textarea
                            name="doctorsNotes"
                            onChange={handleChange}
                            value={formData.doctorsNotes}
                            placeholder="Enter Doctor's Notes"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.doctorsNotes ? 'border-red-500' : ''}`}
                        />
                        {errors.doctorsNotes && <p className="text-red-500 text-xs italic">{errors.doctorsNotes}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit Prior Authorization Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PriorAuthorizationForm;