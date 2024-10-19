const User = require('../models/User'); // Ensure the correct path to the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser  = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate the request body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    try {
        // Check if user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'User  already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({ name, email, password: hashedPassword });
        await newUser .save();

        // Create JWT
        const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Server error' }); // Send a server error response
    }
};

// Login user
const loginUser  = async (req, res) => {
    const { email, password } = req.body;

    // Validate the request body
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: 'Server error' }); // Send a server error response
    }
};

module.exports = { registerUser , loginUser  };