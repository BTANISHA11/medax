import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientDashboard from './components/PatientDashboard';
import PriorAuthorizationForm from './components/PriorAuthorizationForm';
import HomePage from './pages/HomePage';
import Footer from './components/Footer'; // Import Footer
import Login from './components/Login'
// import Settings from './components/Settings'
import Register from './components/Register';

const App = () => {
    return (
        <Router>
            <div className="App flex flex-col min-h-screen"> {/* Use Flexbox for layout */}
                <Navbar />
                <div className="flex-grow"> {/* This allows the main content to grow and fill space */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/authorize" element={<PriorAuthorizationForm />} />
                        <Route path="/patients" element={<PatientDashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* <Route path="/settings" element={<Settings />} /> */}
                        
                    </Routes>
                </div>
                <Footer /> {/* Footer will be at the bottom */}
            </div>
        </Router>
    );
};

export default App;