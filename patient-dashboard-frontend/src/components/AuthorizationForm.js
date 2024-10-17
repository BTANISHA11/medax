import React, { useState } from 'react';
import axios from 'axios';

const AuthorizationForm = ({ patientId }) => {
  const [formData, setFormData] = useState({
    treatment: '',
    diagnosisCode: '',
    insurancePlan: '',
    doctorNotes: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/authorization', { patientId, ...formData });
      alert('Authorization request submitted');
    } catch (err) {
      console.error(err);
      alert('Error submitting request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="treatment" placeholder="Treatment" onChange={handleChange} />
      <input type="text" name="diagnosisCode" placeholder="Diagnosis Code" onChange={handleChange} />
      <input type="text" name="insurancePlan" placeholder="Insurance Plan" onChange={handleChange} />
      <textarea name="doctorNotes" placeholder="Doctor's Notes" onChange={handleChange}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AuthorizationForm;
