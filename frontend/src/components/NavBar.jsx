import {Plus, Settings, User } from "lucide-react"
import {Link } from "react-router-dom"
import {useAuthStore } from "../states/useAuthStore.jsx"

export default function NavBar(){
    const {authUser } = useAuthStore()
    
    return(
        <div className="flex items-center border-b border-gray-400 m-2 p-2 justify-between">
        <div className="flex">
        <h4 className="ml-2.5"><Link to="/">Chat app</Link></h4>
        <div className="bg-purple-600 flex"><Link className=" p-0.5 rounded text-white" to="/groups/create">
        <Plus className="ml-1.5 text-white" />Create group</Link></div>
        </div>
        
        <div className="flex items-center gap-6">
        <Link to="/settings"><Settings /></Link>
        { authUser ? <Link to="/profile"><User className="border rounded-full p-0.5"/></Link>: ""}
        {authUser ? <Link to="/logout"><button className="btn p-0.5">Log out</button></Link> : ""}
        </div>
        </div>
    )
}