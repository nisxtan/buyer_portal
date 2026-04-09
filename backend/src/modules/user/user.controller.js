const userService = require("./user.services");

const register = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const { email, password, name } = req.body;

        const result = await userService.register(AppDataSource, email, password, name);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: result.message,
            success: true,
            data: result.user,
            accessToken: result.accessToken
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const { email, password } = req.body;

        const result = await userService.login(AppDataSource, email, password);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: result.message,
            success: true,
            data: result.user,
            accessToken: result.accessToken
        });
    } catch (err) {
        next(err);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "Refresh token not found",
                success: false
            });
        }

        const result = await userService.refreshTokenService(AppDataSource, token);

        res.status(200).json({
            message: "Token refreshed successfully",
            success: true,
            accessToken: result.accessToken
        });
    } catch (err) {
        next(err);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const user = await userService.getProfile(AppDataSource, req.user.id);

        res.status(200).json({
            message: "Profile fetched successfully",
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, getProfile, refreshToken };