const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access Forbidden: No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user data to request
        next(); // Proceed to the next middleware
    } catch (err) {
        return res.status(403).json({ message: "Access Forbidden: Invalid Token" });
    }
};

module.exports = authenticateUser;