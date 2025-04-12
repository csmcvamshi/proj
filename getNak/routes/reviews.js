const express = require('express');
const router = express.Router();
const db = require('../db'); // Your database connection file
const authenticateUser = require('../middleware/auth'); // Middleware for authentication

// ✅ **API: Submit a Review**
router.post('/submit', authenticateUser, (req, res) => {
    const { orderId, rating, review } = req.body;
    const userId = req.user.userId; // Get the logged-in user's ID

    // Validate input
    if (!orderId || !rating || !review) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert review into the database
    const sql = "INSERT INTO reviews (order_id, user_id, rating, review) VALUES (?, ?, ?, ?)";
    db.query(sql, [orderId, userId, rating, review], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Review submitted successfully!" });
    });
});
// ✅ **API: Get Reviews for a Specific Service**
router.get('/service/:serviceId', authenticateUser, (req, res) => {
    const { serviceId } = req.params;

    const sql = "SELECT * FROM reviews WHERE service_id = ?";
    db.query(sql, [serviceId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "No reviews found for this service" });

        res.json(results);
    });
});

module.exports = router;