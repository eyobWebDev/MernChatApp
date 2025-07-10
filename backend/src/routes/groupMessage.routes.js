import express from "express"
import { sendGroupMessage, getAllGroupMessages, editGroupMessage } from "../controllers/groupMessage.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/sendMessage",protectedRoute, sendGroupMessage)
router.post("/edit",protectedRoute, editGroupMessage)
router.get("/getMessage/:id",protectedRoute, getAllGroupMessages)

export default router