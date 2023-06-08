import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/reset", authController.resetPass);
router.post("/reset/:token", authController.newPass);

export default router;
