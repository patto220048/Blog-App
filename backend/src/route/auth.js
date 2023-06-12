import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
// [POST /reset] | *reset request
router.post("/reset", authController.resetPass);
// [POST /reset/212414242562563afga2341]
router.post("/reset/:token", authController.newPass);
// [GET /verify?email=&code=]
router.get("/verify", authController.verifyMail);
// [POST /verify-email] | *verify email request
router.post("/verify-mail", authController.sendMailVerify);

export default router;
