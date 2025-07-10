import { useGroupChatStore } from "../states/useGroupChatStore"


export default function ShowMoreBox() {
    const {leaveGroup} = useGroupChatStore()

    return<div className="flex flex-col">
        <div className="border-b m-1.5">
            <button className="w-full btn">Leave group</button></div>
        <div className=" border-b m-1.5"><button className="w-full btn">Add user</button></div>
    </div>
}