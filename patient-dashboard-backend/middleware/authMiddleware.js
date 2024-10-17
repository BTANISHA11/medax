const jwt = require('jsonwebtoken');
const Authorization = require('../models/Authorization'); // Ensure this is the correct path for your Authorization model

const authMiddleware = (req, res, next) => {
    // Extract token from authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // If verification is successful, attach user ID to request
        req.userId = decoded.id; // Ensure the token contains a user ID
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;

