const Router = require("express").Router();
const {
    notLoggedIn,
    jwtMiddleware,
    loginMiddleware,
} = require("../../../middlewares/auth");
const httpStatusCodes = require("../../../utils/constants/httpStatusCodes");
const UserService = require("../services/userService");

Router.post("/", async (req, res, next) => {
    try {
        await UserService.create(req.body);
        res.status(httpStatusCodes.ACCEPTED).send("User created successfully");
    } catch (error) {
        next(error);
    }
});

Router.post("/login", notLoggedIn, loginMiddleware);

Router.post("/logout", jwtMiddleware, async (req, res, next) => {
    try {
        res.clearCookie("jwt");
        res.status(httpStatusCodes.NO_CONTENT).send("Logout successful");
    } catch (error) {
        next(error);
    }
});

Router.get("/me", jwtMiddleware, async (req, res, next) => {
    try {
        const user = await UserService.getByEmail(req.user.email);
        const { password, ...userWithoutPassword } = user;
        res.status(httpStatusCodes.SUCCESS).send(userWithoutPassword);
    } catch (error) {
        next(error);
    }
});

module.exports = Router;
