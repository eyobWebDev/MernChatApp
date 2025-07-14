import GroupMessage from "../models/groupMessage.models.js"
import { io } from "../lib/socket.js"

//to get all messages from a groups
export const getAllGroupMessages = async (req, res) => {
    const {id: groupId} = req.params
    try {
        //query all message with this groupId and the sender ids object field also should be populated to display them in the frontend
        const messages = await GroupMessage.find({ groupId }).populate({
        path: "senderId",
        select: "fullName email profilePic", // Adjust fields as needed
      })
      res.status(200).json({messages})
    } catch (e) {
        console.log("Error in getAllGroupMessages controller", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

//to send message to  group
export const sendGroupMessage = async (req, res) => {
    const {content, groupId, senderId} = req.body

    try {
        const groupMessage = new GroupMessage({groupId, content, senderId})
        if(!groupMessage){
            return res.status(400).json({message: "Bad request: Could not create the message."})
        }
        res.status(201).json(groupMessage)
        await groupMessage.save()
        const newMessage = await groupMessage.populate({path: "senderId", select: "fullName email profilePic"})

        //socket connection for real time
        console.log("sendig message to", groupMessage.groupId.toString());
        
        io.to(groupMessage.groupId.toString()).emit("new-group-message", newMessage)
        
    } catch (e) {
        console.log("Error in sendGroupMessage controller.", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}


//edit group messages
export const editGroupMessage = async (req, res) => {
    const {id: groupId} = req.params
    const {messageId, content} = req.body
    try {
        const senderId = req.user._id
        const groupMessage = await GroupMessage.findById({_id: messageId})
        const userCanEdit = senderId.toString() == groupMessage.senderId.toString()
        if(userCanEdit){
            const newGroupMessage = await GroupMessage.findByIdAndUpdate({_id: messageId},
                {content}, {new: true})
            res.status(200).json({groupMessage: newGroupMessage, message: "Succesfully edited the message"})
            //implement real time connection
        } else {
            console.log("Error in editGroupMessage controller.", e.message)
            res.status(500).json({message: "Internal server error."})
        }

    } catch (e) {
        console.log("Error in editGroupMessage controller.", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

//deleet group message
export const deleteGroupMessage = (req, res) => {

}