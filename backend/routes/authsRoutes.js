const express = require('express');
const { loginUser, registerUser } = require('../controllers/authsController');

const router = express.Router();

// POST Request - Register a new user
router.post('/register', registerUser);

// POST Request - Login a user
router.post('/login', loginUser);

module.exports = router;
