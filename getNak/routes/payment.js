const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../db");

// ✅ Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Initiate Payment (POST /api/payments/initiate)
router.post("/initiate", async (req, res) => {
    try {
        const { userId, amount, currency } = req.body;

        const options = {
            amount: amount * 100, // Convert to paise
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        db.query(
            "INSERT INTO payments (user_id, payment_id, amount, currency, status) VALUES (?, ?, ?, ?, ?)",
            [userId, order.id, amount, currency, "pending"],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({
                    status: "created",
                    orderId: order.id,
                    amount: order.amount,
                    currency: order.currency,
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Verify Payment (POST /api/payments/verify)
router.post("/verify", async (req, res) => {
    try {
        const { order_id, payment_id, signature } = req.body;

        // Generate expected signature
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(order_id + "|" + payment_id)
            .digest("hex");

        if (generated_signature === signature) {
            db.query("UPDATE payments SET status = ? WHERE payment_id = ?", ["success", payment_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ status: "success", transactionId: payment_id });
            });
        } else {
            db.query("UPDATE payments SET status = ? WHERE payment_id = ?", ["failed", payment_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(400).json({ status: "failure", message: "Invalid signature" });
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Payment History (GET /api/payments/history)
router.get("/history", async (req, res) => {
    try {
        db.query("SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC LIMIT 10", [req.query.userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;