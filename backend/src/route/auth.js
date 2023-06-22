import express from "express";
import authController from "../controller/authController.js";
import verifyToken from '../controller/verifyToken.js';

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout",verifyToken.verifyUser, authController.logout);
// [POST /reset] | *reset request
router.post("/reset", authController.resetPass);
// [POST /reset/212414242562563afga2341]
router.post("/reset/:token", authController.newPass);
// [GET /verify?email=&code=]
router.get("/verify", authController.verifyMail);
// [POST /verify-email] | *verify email request
router.post("/verify-mail", authController.sendMailVerify);
// [POST /refreshtoken]
router.post("/refresh", verifyToken.verifyUser, authController.refresh);

export default router;
