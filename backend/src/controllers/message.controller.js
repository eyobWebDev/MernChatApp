import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import {getSocketId , io} from "../lib/socket.js"
import cloudinary from "../lib/cloudinary.js"


export const getAllUsers = async (req, res) =>{
    try {
        const userId = req.user._id
        const filteredUser = await User.find({_id: {$ne: userId}}).select("-password")
        res.status(200).json(filteredUser)
    } catch (e) {
        console.log("Error in getting all users", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getMessages = async (req, res) =>{
    try {
        const myId = req.user._id
        const {id: userToChatId} = req.params
        const allMessages = await Message.find({
            $or: [{senderId: myId, recieverId: userToChatId},
            {senderId: userToChatId, recieverId: myId}]
        })
        res.status(200).json(allMessages)
    } catch (e) {
        console.log("Error in getting all messages", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}

export const sendMessage = async (req, res) =>{
    try {
        const senderId = req.user._id
        const {text, image: recievedImage} = req.body
        const {id: recieverId} = req.params
        let cloudinaryRes
        let message
        if(recievedImage){
            cloudinaryRes = await cloudinary.uploader.upload(recievedImage)
            message = new Message({
            senderId, recieverId, text, image: cloudinaryRes.secure_url
        })
        }else {
            message = new Message({
            senderId, recieverId, text
        })
        }
       
        if(!message){
            res.status(400).json({message: "Error creating message."})
        }
        res.status(201).json(message)
        await message.save()
        const recieverSocketId = getSocketId(recieverId)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", message)
        }
        
    } catch (e) {
        console.log("Error in creating a message", e.message)
        res.status(500).json({message: "Internal server error"})
    }
}