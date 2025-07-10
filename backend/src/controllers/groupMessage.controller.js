import GroupMessage from "../models/groupMessage.models.js"
//to get all messages from a groups
export const getAllGroupMessages = (req, res) => {
    const {id} = req.params
    try {
        //query all message with this groupId
    } catch (e) {
        console.log("Error in getAllGroupMessages controller", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

//to send message to  group
export const sendGroupMessage = async (req, res) => {
    const {groupId, content} = req.body
    try {
        const senderId = req.user._id
        const groupMessage = new GroupMessage({groupId, content, senderId})
        if(!groupMessage){
            return res.status(400).json({message: "Bad request: Could not create the message."})
        }
        res.status(201).json(groupMessage)
        await groupMessage.save()
        //implement socket connection for real time
        
    } catch (e) {
        console.log("Error in sendGroupMessage controller.", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}


//edit group message
export const editGroupMessage = async (req, res) => {
    const {id: groupId} = req.params
    const {messageId, content} = req.body
    try {
        const senderId = req.user._id
        const groupMessage = await GroupMessage.findById({_id: messageId})
        const userCanEdit = senderId.toString() == groupMessage.senderId.toString()
        if(userCanEdit){
            const newGroupMessage = await GroupMessage.findByIdAndUpdate({_id: messageId},
                {content}, {new: true}
            )
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