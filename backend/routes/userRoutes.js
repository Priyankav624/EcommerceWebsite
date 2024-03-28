import express from "express";
import { 
    createUser, 
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from "../controllers/userControllers.js";

import { authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"


const router = express.Router()

//create user
router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);      // the user shld be authenticated -- email password , or admin
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser)

//get a specific user data
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

//Admin routes
router.
    route('/:id').
    delete(authenticate, authorizeAdmin, deleteUserById).
    get(authenticate, authorizeAdmin, getUserById).
    put(authenticate, authorizeAdmin, updateUserById)

export default router;