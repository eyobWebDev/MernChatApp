
import { MessageCircle, PersonStanding, ImageIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useGroupChatStore } from "../states/useGroupChatStore"

export default function ChatRoomTab() {
    const {selectedGroup} = useGroupChatStore()

    return <div className="flex justify-between">
        <NavLink to={"/groups/"+selectedGroup._id+"/messages" }
       className={({isActive}) => isActive ? "text-blue-400": ""}
       >
         <div className="p-1 flex gap-1.5">
            <MessageCircle />
            <div>Messages</div>
         </div>
        </NavLink>

        <NavLink to={"/groups/"+selectedGroup._id+"/members"}
        className={({isActive}) => isActive ? "text-blue-400 ": ""}>
            <div className="p-1 flex gap-1.5">
                <PersonStanding className="" />
                <div className="">Members</div>
            </div>
            
        </NavLink>

        <NavLink to={"/groups/"+selectedGroup._id+"/media"}
        className={({isActive}) => isActive ? "text-blue-400": ""}>
            <div className="p-1 flex gap-1.5">
                <ImageIcon />
                <div>Media</div>
            </div>
        </NavLink>
    </div>
}