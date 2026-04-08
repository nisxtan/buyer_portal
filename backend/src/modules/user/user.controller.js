const userService = require("./user.services");

const register = async (req, res, next) => {
    try {
        const AppDataSource = req.app.get("AppDataSource");
        const { email, password, name } = req.body;

        const result = await userService.register(AppDataSource, email, password, name);

        res.status(201).json({
            message: result.message,
            success: true,
            data: result.user,
            token: result.token
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

        res.status(200).json({
            message: result.message,
            success: true,
            data: result.user,
            token: result.token
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

module.exports = { register, login, getProfile };