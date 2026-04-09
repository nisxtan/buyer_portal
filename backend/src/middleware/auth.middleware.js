const { verifyAccessToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied, no token provided",
                success: false
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role || "buyer"
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

module.exports = authMiddleware;