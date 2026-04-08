const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt");

const register = async (AppDataSource, email, password, name) => {
    const userRepository = AppDataSource.getRepository("User");
    
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw { message: "User already exists", code: 400 };
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw { message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)", code: 400 };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({
        email,
        password: hashedPassword,
        name,
        role: "buyer"
    });
    
    await userRepository.save(user);
    
    const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    });
    
    return {
        message: "User registered successfully",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const login = async (AppDataSource, email, password) => {
    const userRepository = AppDataSource.getRepository("User");
    
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
        throw { message: "Invalid credentials", code: 401 };
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw { message: "Invalid credentials", code: 401 };
    }
    
    const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    });
    
    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const getProfile = async (AppDataSource, userId) => {
    const userRepository = AppDataSource.getRepository("User");
    
    const user = await userRepository.findOne({
        where: { id: userId },
        select: ["id", "name", "email", "role", "created_at"]
    });
    
    if (!user) {
        throw { message: "User not found", code: 404 };
    }
    
    return user;
};

module.exports = { register, login, getProfile };