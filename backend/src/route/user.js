import express from "express";
import userController from "../controller/userController.js";
import verifyToken from '../controller/verifyToken.js';

const router = express.Router();
router.get('/', verifyToken.verifyUser ,userController.getUsers)
router.get('/:userId', verifyToken.verifyUser ,userController.getUser)
router.delete('/:userId', verifyToken.verifyAdmin, userController.deleteUser)
router.delete('/:userId', verifyToken.verifyAdmin, userController.deleteUsers)
router.put('/:userId', verifyToken.verifyAdmin, userController.updateUser)
export default router;
