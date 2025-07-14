import { useState } from "react"
import { useAuthStore } from "../states/useAuthStore"
import { useGroupChatStore } from "../states/useGroupChatStore"
import MessageLayout from "./MessageLayout"
import SendMessageLayout from "./SendMessageLayout"
import { useEffect } from "react"
import { Loader } from "lucide-react"

export default function GroupMessageTab() {
    const {groupMessages, subscribeToMessage, unsubscribeFromMessage,selectedGroup, joinGroup} = useGroupChatStore()
    const {authUser} = useAuthStore()
    const [isInGroup, setIsInGroup] =  useState(false)

    useEffect(() => {
        subscribeToMessage()

        return () => {
            unsubscribeFromMessage()
        };
    }, [selectedGroup?._id]);

    const handleClick = async () => {
        await joinGroup({groupId: selectedGroup._id})
    }

    

    return<>
    <div className="h-[60vh] overflow-scroll">
        {groupMessages.length > 0 ? 
        (groupMessages.map(message => {
                    return <MessageLayout message={message} />
                })) : "No messages yet."
            }
            </div>

            <div>
                 <SendMessageLayout /> 
            </div>
    </>
}