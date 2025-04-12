const db = require('../db');

const Order = {
    create: (customerId, serviceId, providerId, price, callback) => {
        const sql = "INSERT INTO orders (customer_id, service_id, provider_id, price, status) VALUES (?, ?, ?, ?, 'Pending')";
        db.query(sql, [customerId, serviceId, providerId, price], callback);
    },

    getById: (orderId, callback) => {
        db.query("SELECT * FROM orders WHERE order_id = ?", [orderId], callback);
    },

    getByUser: (userId, callback) => {
        db.query("SELECT * FROM orders WHERE customer_id = ? OR provider_id = ?", [userId, userId], callback);
    },

    updateStatus: (orderId, status, callback) => {
        db.query("UPDATE orders SET status = ? WHERE order_id = ?", [status, orderId], callback);
    }
};

module.exports = Order;