import express from "express";
import { authUser, logoutUser, getUserProfile, updateUserProfile, registerUser, getUsers, getUserById, updateUserById, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.route('/').post(registerUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUserById);

export default router;