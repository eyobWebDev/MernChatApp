import express from "express"
import {signup, login, logout, checkAuth, updateProfile } from "../controllers/auth.controller.js"
import {protectedRoute} from "../middleware/auth.middleware.js"
import multer from 'multer'
const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/check-auth", protectedRoute, checkAuth)
router.post("/update-profile", protectedRoute, updateProfile)

export default router