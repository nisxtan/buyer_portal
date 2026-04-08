const validateBody = (schema) => {
    return (req, res, next) => {
        const errors = [];
        
        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];
            
            // Check required
            if (rules.required && (!value || value.toString().trim() === "")) {
                errors.push({ field, message: rules.message || `${field} is required` });
                continue;
            }
            
            if (value) {
                // Check min length
                if (rules.min && value.length < rules.min) {
                    errors.push({ field, message: rules.message || `${field} must be at least ${rules.min} characters` });
                }
                
                // Check pattern
                if (rules.pattern && !rules.pattern.test(value)) {
                    errors.push({ field, message: rules.message || `${field} is invalid` });
                }
            }
        }
        
        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                success: false,
                errors
            });
        }
        
        next();
    };
};

module.exports = validateBody;