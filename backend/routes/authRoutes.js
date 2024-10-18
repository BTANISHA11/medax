const express = require('express');
const { addAuthorization, getAuthorizations } = require('../controllers/authorizationController');

const router = express.Router();

// POST Request - Submit a new prior authorization request
router.post('/', addAuthorization);

// GET Request - Get all prior authorization requests
router.get('/', getAuthorizations);

module.exports = router;
