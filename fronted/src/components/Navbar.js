// src/components/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">Patient Dashboard</h1>
                <div className="flex items-center relative">
                    <Link to="/" className="text-white mr-4 hover:underline">Home</Link>
                    <Link to="/authorize" className="text-white mr-4 hover:underline">Prior Authorization</Link>
                    <Link to="/patients" className="text-white mr-4 hover:underline">Patients</Link>
                    
                    {/* More Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            className="text-white hover:underline"
                            onClick={toggleDropdown}
                        >
                            More
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</Link>
                                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                                <Link to="/help" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Help</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;