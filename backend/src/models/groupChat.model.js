import mongoose from "mongoose"

const groupChatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        members: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User"
            },
        ],
        
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        description: {
            type: String
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GroupMessage"
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        groupProfilePic: {
            type: String,
            default: ""
        }

    },
    { timestamps: true }
)

const GroupChat = mongoose.model("GroupChat", groupChatSchema)
export default GroupChat