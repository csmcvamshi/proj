const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateUser = require('../middleware/auth'); 

// ✅ **API: Get User Notifications**
router.get('/', authenticateUser, (req, res) => {
    const userId = req.user?.userId; // Extract user ID from JWT token

    // 🔥 Debugging: Log extracted user ID
    console.log("Fetching notifications for user ID:", userId);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Invalid Token" });
    }

    const sql = "SELECT * FROM notifications WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Database query failed" });
        }

        // 🔥 Debugging: Log query results
        console.log("Query Results:", results);

        if (results.length === 0) {
            return res.status(404).json({ message: "No notifications found." });
        }

        res.json(results);
    });
});

module.exports = router;