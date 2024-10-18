// src/components/Modal.js
import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded shadow-lg p-6 z-10">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;