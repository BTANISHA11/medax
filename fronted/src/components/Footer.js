// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-600 p-4 text-white mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Patient Dashboard. All rights reserved.</p>
                <p className="mt-2">Contact us: <a href="mailto:support@patientdashboard.com" className="underline">support@patientdashboard.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;