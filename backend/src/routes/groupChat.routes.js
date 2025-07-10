import express from "express"
import { createGroup, leaveGroup, getAllMembers, joinGroup , updateGroupProfile, deleteGroup, getAllGroups} from "../controllers/groupChat.controller.js"
import { protectedRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/create",protectedRoute, createGroup)
router.post("/join", protectedRoute, joinGroup)
router.post("/leave/:id",protectedRoute, leaveGroup)
router.post("/delete/:id",protectedRoute, deleteGroup)
router.post("/update/:id",protectedRoute, updateGroupProfile)
router.get("/getAllMembers/:id",protectedRoute, getAllMembers)
router.get("/getAllGroups",protectedRoute, getAllGroups)

export default router