
import { MessageCircle, PersonStanding, ImageIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useGroupChatStore } from "../states/useGroupChatStore"

export default function ChatRoomTab() {
    const {selectedGroup} = useGroupChatStore()

    return <div className="flex justify-around">
        <NavLink to={"/groups/"+selectedGroup._id }
       className={`p-1 flex gap-1.5 border-b chat ${({isActive}) => isActive ? "text-blue-400": ""}`}
       >
            <MessageCircle />
            <div>Messages</div>
        </NavLink>

        <NavLink to={"/groups/"+selectedGroup._id+"/members"}
        className="p-1 flex gap-1.5 border-b">
            <PersonStanding />
            <div>Members</div>
        </NavLink>

        <NavLink to={"/groups/"+selectedGroup._id+"/media"}
        className="p-1 flex gap-1.5 border-b">
            <ImageIcon />
            <div>Media</div>
        </NavLink>
    </div>
}