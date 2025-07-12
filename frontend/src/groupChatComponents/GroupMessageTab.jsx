import { useState } from "react"
import { useAuthStore } from "../states/useAuthStore"
import { useGroupChatStore } from "../states/useGroupChatStore"
import MessageLayout from "./MessageLayout"
import SendMessageLayout from "./SendMessageLayout"
import { useEffect } from "react"
import { Loader } from "lucide-react"

export default function GroupMessageTab() {
    const {groupMessages, groupMembers,selectedGroup, joinGroup, joinGroupLoading} = useGroupChatStore()
    const {authUser} = useAuthStore()
    const [isInGroup, setIsInGroup] =  useState(false)
 
    useEffect(() => {
        setIsInGroup(groupMembers.some(members => members._id == authUser._id))
    })

    const handleClick = async () => {
        await joinGroup({groupId: selectedGroup._id})
        setIsInGroup(true)
    }

    return<>
    <div className="h-[60vh]">
        {groupMessages.length > 0 ? 
        (groupMessages.map(message => {
                    return <MessageLayout message={message} />
                })) : "No messages yet."
            }
            </div>

            <div>
                  {isInGroup ? <SendMessageLayout /> : 
                  <button onClick={handleClick} disabled={joinGroupLoading} className="btn w-full">{joinGroupLoading ? <Loader />: "JOIN"}</button>}
            </div>
    </>
}