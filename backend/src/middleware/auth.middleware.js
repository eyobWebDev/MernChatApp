import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            res.status(401).json({message: "Unauthorized - No token provided."})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded){
            res.status(400).json({message: "Unauthorized - Invalid Token."})
        }
        const user = await User.findById(decoded.userId).select("-password")
        
        if (!user){
            res.status(404).json({message: "User not found"})
        }
        req.user = user
        next()
    } catch (e) {
        console.log("Error in protected route", e.message)
        res.status(500).json({message: "Internal server error"})
    }
    
}