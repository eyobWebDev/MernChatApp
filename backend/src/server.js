import {config } from "dotenv"
import express from "express"
import {connectDB } from "./lib/db.js"
import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import groupChatRouter from "./routes/groupChat.routes.js"
import groupMessageRouter from "./routes/groupMessage.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import {app, server } from "./lib/socket.js"
import path from "path"

config()

app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "https://mern-chat-app-rho-blue.vercel.app",
    credentials: true
}))
const __dirname = path.resolve()
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/groups", groupChatRouter)
app.use("/api/groups/message", groupMessageRouter)


server.listen(process.env.PORT, () => {
    console.log("server listening on port "+process.env.PORT)
    connectDB()
})
