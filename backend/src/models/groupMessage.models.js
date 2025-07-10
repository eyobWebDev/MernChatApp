import mongoose, { mongo } from "mongoose"

const groupMessageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GroupChat",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: ""
        }
    },
    {timestamps: true}
)

const GroupMessage = mongoose.model("GroupMessage", groupMessageSchema)
export default GroupMessage