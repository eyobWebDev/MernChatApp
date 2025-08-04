import {NavLink } from "react-router-dom"
import {User, Mail, Group, Users, UserCircle} from "lucide-react"
import {useChatStore } from "../states/useChatStore.jsx"
import {colors}  from "../utils/colors.js"



export default function Header(){
    const {selectedUser} = useChatStore()
    
    return <div className="not-sm:text-[15px] border-gray-600 flex gap-4 border-b-4">
    <div className="ml-2 not-sm:text-[15px] p-1"><NavLink to={`/`} className={
        ({isActive}) => isActive ? `text-[${colors.primary}] custom-text-color`: ""}> All</NavLink></div>

    <div className="ml-2 not-sm:text-[14px] p-1"><NavLink to={`/users`} className={
        ({isActive}) => isActive ? `text-[${colors.primary}] gap-1 flex items-center custom-text-color`: "flex items-center gap-1"}>
            <UserCircle className="inline not-sm:size-5"/> Users</NavLink></div>

    <div className="ml-2 not-sm:text-[15px] p-1"><NavLink to={`/groups`} className={
        ({isActive}) => isActive ? `flex items-center gap-1 text-[${colors.primary}] custom-text-color`: "flex items-center gap-1"}><Users className="inline not-sm:size-5"/> Group</NavLink></div>
    </div>
}