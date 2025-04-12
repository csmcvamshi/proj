const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new service
router.post('/', (req, res) => {
    const { title, description, price } = req.body;

    const query = `
        INSERT INTO services (title, description, price)
        VALUES (?, ?, ?)
    `;
    db.query(query, [title, description, price], (err, result) => {
        if (err) {
            console.error('Error adding service:', err.message);
            return res.status(500).json({ message: 'Failed to add service' });
        }
        res.status(201).json({ message: 'Service added successfully!', serviceId: result.insertId });
    });
});

module.exports = router;