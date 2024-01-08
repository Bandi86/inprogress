import express from "express";
import registerUser from "../auth/register.js";
import loginUser from "../auth/login.js";
import logoutUser from "../auth/logout.js";
import verifySession from "../auth/verify_session.js";
import { multerAvatarUpload } from "../storage/avatar_upload.js";
import productsController from "../controllers/products_controller.js";

const router = express.Router();

// AUTH
router.post("/register",  multerAvatarUpload().single("file"), registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/verify-session", verifySession);


// PRODUCTS
router.get("/products", productsController.getAll)


export default router;
