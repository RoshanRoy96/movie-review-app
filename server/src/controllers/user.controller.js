import jsonwebtoken from "jsonwebtoken";
import userModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        const checkUser = await userModel.findOne({ username });
        if (checkUser) return responseHandler.badrequest(res, "Username already exists");

        const user = new userModel();
        user.displayName = displayName;
        user.username = username;
        user.password = password;
        user.setPassword(password);

        await user.save();
        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.SECRET_TOKEN,
            { expiresIn: "150d" }
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        })
    } catch (error) {
        // res.status(400).json({error})
        responseHandler.error(res, error);
    }
}

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select("username password salt id displayName");

        if (!user) return responseHandler.badrequest(res, "User not exist");
        
        if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.SECRET_TOKEN,
            { expiresIn: "150d" }
        );

        user.password = undefined;
        user.salt = undefined;

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        })
    } catch (error) {
        console.log("dvb" + error);
        res.status(400).json(error)
        // responseHandler.error(res, error);
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await userModel.findById(req.user.id).select("password id salt");

        if (!user) responseHandler.unauthorize(res);

        if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

        user.setPassword(newPassword);

        await user.save();

        responseHandler.ok(res);
    } catch (error) {
console.log(error);       res.status(400).json({error})
        // responseHandler.error(res, error);
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) return responseHandler.notfound(res);

        responseHandler.ok(res, user);
    } catch (error) {
console.log(error);       res.status(400).json({error})
        // responseHandler.error(res, error);
    }
}

export default {
    signin,
    signup,
    getInfo,
    updatePassword
}