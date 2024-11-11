const express = require('express');
const router = express.Router();

// Test route for at verificere at API'en virker
router.get('/', (req, res) => {
    res.json({ message: 'User routes er aktive' });
});

module.exports = router;