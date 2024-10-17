// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientDashboard from './components/PatientDashboard';
import PriorAuthorizationForm from './components/PriorAuthorizationForm';

// import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <div className="App">
             
                <Routes>
                    <Route path="/" element={<PatientDashboard />} />
                    <Route path="/authorize" element={<PriorAuthorizationForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;