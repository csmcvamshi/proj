const db = require('../db');

const Service = {
    create: (providerId, serviceName, description, price, callback) => {
        const query = "INSERT INTO services (provider_id, service_name, description, price) VALUES (?, ?, ?, ?)";
        db.query(query, [providerId, serviceName, description, price], callback);
    },
    getAll: (callback) => {
        const query = "SELECT * FROM services";
        db.query(query, callback);
    }
};

module.exports = Service;