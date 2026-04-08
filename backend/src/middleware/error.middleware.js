const errorHandler = (err, req, res, next) => {
    const statusCode = err.code && err.code >= 400 && err.code < 600 ? err.code : 500;

    const message = err.message || "Internal Server Error";

    if (statusCode === 500) {
        console.error("❌ Unhandled Error:", err);
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
};

module.exports = errorHandler;
