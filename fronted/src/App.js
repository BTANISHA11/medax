// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard';
import PriorAuthorizationForm from './components/PriorAuthorizationForm';
// import PatientCard from './components/PatientCard';
import HomePage from './pages/HomePage';

// import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <div className="App">
             
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/authorize" element={<PriorAuthorizationForm />} />
                    <Route path="/patients" element={<PatientDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;