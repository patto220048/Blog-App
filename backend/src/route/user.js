import express from "express";
import userController from "../controller/userController.js";
import verifyToken from '../controller/verifyToken.js';

const router = express.Router();
router.get('/', verifyToken.verifyAdmin ,userController.getUsers)
router.get('/:userId', verifyToken.verifyAdmin ,userController.getUser)
export default router;
