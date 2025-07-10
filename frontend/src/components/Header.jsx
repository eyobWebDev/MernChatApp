import {NavLink } from "react-router-dom"
import {User, Mail, Group, Users} from "lucide-react"
import {useChatStore } from "../states/useChatStore.jsx"

export default function Header(){
    const {selectedUser} = useChatStore()
    
    return <div className=" border-b border-gray-400 flex gap-4 mt-3">
    <div className="ml-2 p-1"><NavLink to="/users" className={
        ({isActive}) => isActive ? "text-blue-400": ""}><User className="inline"/> Users</NavLink></div>
    <div className="ml-2 p-1"><NavLink to={`/message/${selectedUser? selectedUser._id : 0}`} className={
        ({isActive}) => isActive ? "text-blue-400": ""}><Mail className="inline"/> Message</NavLink></div>
    <div className="ml-2 p-1"><NavLink to={`/groups`} className={
        ({isActive}) => isActive ? "text-blue-400": ""}><Users className="inline"/> Group</NavLink></div>
    </div>
}