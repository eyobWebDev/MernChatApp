import express from "express"
import {getAllUsers, getMessages, sendMessage, editMessage } from "../controllers/message.controller.js"
import {protectedRoute} from "../middleware/auth.middleware.js"


const router = express.Router()

router.get("/users", protectedRoute, getAllUsers)
router.get("/:id", protectedRoute, getMessages)
router.post("/send/:id", protectedRoute, sendMessage)
router.post("/edit/:id", protectedRoute, editMessage)

export default router