const User = require('../models/User'); // Ensure the correct path to the User model
const bcrypt = require('bcryptjs');

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

        // Create new user instance
        const newUser  = new User({ name, email, password }); // Store plain password for hashing in the model

        // Save the user (this will trigger the pre-save hook for hashing)
        await newUser .save();

        // Create JWT only on registration
        const token = jwt.sign({ id: newUser ._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration error:', error); // Log the error
        res.status(500).json({ message: 'Server error' }); // Send a server error response
    }
};

// Login user
const loginUser  = async (req, res) => {
    const { email, password } = req.body;

    // Validate the request body
    if (!email || !password) {
        console.log('Validation failed:', { email, password }); // Debug log
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User  not found:', email); // Debug log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password using the method from the User model
        const isMatch = await user.matchPassword(password); // Use the matchPassword method
        if (!isMatch) {
            console.log('Password does not match for user:', email); // Debug log
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // No JWT creation here
        res.status(200).json({ message: 'Login successful' }); // Send a success message
    } catch (error) {
        console.error('Server error:', error); // Log the error
        res.status(500).json({ message: 'Server error' }); // Send a server error response
    }
};

module.exports = { registerUser , loginUser  };