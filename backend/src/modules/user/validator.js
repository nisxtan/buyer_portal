const registerSchema = {
    name: {
        required: true,
        min: 2,
        message: "Name must be at least 2 characters"
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please provide a valid email"
    },
    password: {
        required: true,
        min: 6,
        message: "Password must be at least 6 characters"
    }
};

const loginSchema = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please provide a valid email"
    },
    password: {
        required: true,
        message: "Password is required"
    }
};

module.exports = { registerSchema, loginSchema };