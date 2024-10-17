// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">Patient Dashboard</h1>
                <div>
                    <Link to="/" className="text-white mr-4 hover:underline">Home</Link>
                    <Link to="/authorize" className="text-white hover:underline">Prior Authorization</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;