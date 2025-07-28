import {Plus, Settings, User, UserCheck2 } from "lucide-react"
import {Link } from "react-router-dom"
import {useAuthStore } from "../states/useAuthStore.jsx"
import { colors } from "../utils/colors.js"

export default function NavBar(){
    const {authUser } = useAuthStore()
    
    return(
        <div className="flex items-center border-b border-gray-400 m-2 p-2 justify-between">
        <div className="flex">
        <h4 className="ml-2.5"><Link to="/">Chat app</Link></h4>
            <div className={`bg-[${colors.background}] ms-2 rounded p-1 hover:text-[${colors.primary}]`}>
                <Link className="flex items-center gap-1" to="/groups/create">
                    <Plus size={20} />
                    <div>Create group</div>
                </Link>
            </div>
        </div>
        
        <div className="flex items-center gap-6">
        <Link to="/settings" className="flex gap-1.5"><Settings /><div>Settings</div></Link>
        { authUser ? <Link to="/profile" className="flex gap-1.5"><UserCheck2 className=" rounded-full p-0.5"/><div>Profile</div></Link>: ""}
        {authUser ? <Link to="/logout"><button className="btn p-0.5">Log out</button></Link> : ""}
        </div>
        </div>
    )
}