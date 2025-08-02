import { useGroupChatStore } from "../states/useGroupChatStore"


export default function ShowMoreBox() {
    const {leaveGroup} = useGroupChatStore()

    return<div className="flex z-50 flex-col">
        <div className="border-b-1 border-e-gray-900"><button className="w-full btn">Leave group</button></div>
        <div className=" border-b-1 border-e-gray-900"><button className="w-full btn">Add user</button></div>
        <div className=" border-b-1 border-e-gray-900"><button className="w-full btn">Add user</button></div>
    </div>
}