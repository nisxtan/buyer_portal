const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_ACCESS_EXPIRES_IN });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: config.JWT_REFRESH_EXPIRES_IN });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};