const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const authenticateUser = require('../middleware/auth');

// ✅ **API: Place an Order**
router.post('/place', authenticateUser, (req, res) => {
    const { serviceId, providerId, price } = req.body;
    const customerId = req.user.userId; // Extract from token

    // Validate required fields
    if (!serviceId || !providerId || !price) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    Order.create(customerId, serviceId, providerId, price, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Order placed successfully!", orderId: result.insertId });
    });
});

// ✅ **API: Get User Orders**
router.get('/my-orders', authenticateUser, (req, res) => {
    const userId = req.user.userId;

    Order.getByUser(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(results);
    });
});

// ✅ **API: Update Order Status**
router.put('/update-status', authenticateUser, (req, res) => {
    const { orderId, status } = req.body;

    // Validate required fields
    if (!orderId || !status) {
        return res.status(400).json({ message: "Missing orderId or status" });
    }

    Order.updateStatus(orderId, status, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Order status updated successfully!" });
    });
});

module.exports = router;