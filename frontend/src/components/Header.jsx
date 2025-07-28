import {NavLink } from "react-router-dom"
import {User, Mail, Group, Users, UserCircle} from "lucide-react"
import {useChatStore } from "../states/useChatStore.jsx"
import { colors } from "../utils/colors.js"

export default function Header(){
    const {selectedUser} = useChatStore()
    
    return <div className=" border-gray-600 flex gap-4 mt-3 border-b-4">
    <div className="ml-2 p-1"><NavLink to={`/`} className={
        ({isActive}) => isActive ? `text-[${colors.primary}]`: ""}> All</NavLink></div>

    <div className="ml-2 p-1"><NavLink to={`/users`} className={
        ({isActive}) => isActive ? `text-[${colors.primary}]`: ""}><UserCircle className="inline"/> Users</NavLink></div>

    <div className="ml-2 p-1"><NavLink to={`/groups`} className={
        ({isActive}) => isActive ? `text-[${colors.primary}]`: ""}><Users className="inline"/> Group</NavLink></div>
    </div>
}