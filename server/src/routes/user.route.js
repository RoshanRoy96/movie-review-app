import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js"
import requestHandler from "../handlers/request.handler.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/signup",
    body('username')
        .exists().withMessage("username is required")
        //.exists() is a Chai method that checks whether an element exists on the page. In this case, it checks whether the password field exists.
        .isLength({ min: 8 }).withMessage("username must contain minimum 8 characters")
        .custom(async value => {
            const user = await userModel.findOne({ username: value });
            if (user) return Promise.reject("username already exists");
        }),
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password must contain minimum 8 characters"),
    //.isLength() is an Express Validator function that checks the length of a string.
    //{ min: 8 } is an option object passed to the .isLength() function, specifying a minimum length of 8.
    //.withMessage() is another function from Express Validator that allows you to attach a custom error message to the validation function
    body("confirmPassword")
        .exists().withMessage("confirmPassword is required")
        .isLength({ min: 8 }).withMessage("confirmPassword must contain minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error("passwords do not match")
        }),
    body("displayName")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("displayName must contain minimum 8 characters"),
    // requestHandler.validate,
    userController.signup
);

router.post("/signin",
    body('username')
        .exists().withMessage("username is required")
        .isLength({ min: 8 }).withMessage("username must contain minimum 8 characters"),
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password must contain minimum 8 characters"),
    // requestHandler.validate,
    userController.signin
);


router.put("/password-update",
    tokenMiddleware.auth,
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password must contain minimum 8 characters"),
    body("newPassword")
        .exists().withMessage("newPassword is required")
        .isLength({ min: 8 }).withMessage("newPassword must contain minimum 8 characters"),
    body("confirmNewPassword")
        .exists().withMessage("confirmNewPassword is required")
        .isLength({ min: 8 }).withMessage("confirmNewPassword must contain minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("passwords do not match")
        }),
    // requestHandler.validate,
    userController.updatePassword
)

router.get("/info",
    tokenMiddleware.auth,
    userController.getInfo
)

router.get("/favorites",
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfUser
)

router.post("/favorites",
    tokenMiddleware.auth,
    body("mediaType")
        .exists().withMessage("mediatype is required")
        .custom(type => ['movie', 'tv'].includes(type).withMessage("mediaType invalid")),
    body("mediaId")
        .exists().withMessage("mediaID is required")
        .isLength({ min: 1 }).withMessage("mediaId can't be empty"),
    body("mediaTitle")
        .exists().withMessage("mediaTitle is required"),
    body("mediaPoster")
        .exists().withMessage("mediaPoster is required"),
    body("mediaRate")
        .exists().withMessage("mediaRate is required"),
    // requestHandler.validate,
    favoriteController.addFavorite,
)

router.delete("/favorites/:favoriteId",
    tokenMiddleware.auth,
    favoriteController.removeFavorite
)

export default router;