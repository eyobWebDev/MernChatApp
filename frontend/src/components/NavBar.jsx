import {Plus, SearchIcon, Settings, User, UserCheck2 } from "lucide-react"
import {Link } from "react-router-dom"
import {useAuthStore } from "../states/useAuthStore.jsx"
import { colors } from "../utils/colors.js"
import MainDrawer from "./MainDrawer.jsx"

export default function NavBar(){
    const {authUser } = useAuthStore()
    
    return(
        <div className="flex items-center text-[15px] sm:text-base border-b-1 border-gray-400 pl-1.5 pr-1.5 pt-2 pb-2 justify-between">
            <div className="flex items-center">
                <MainDrawer />
                <h4 className="ml-2.5 not-sm:text-[12px]"><Link to="/">Chat app</Link></h4>
            </div>

            <div className="p-3 flex items-center justify-between rounded-4xl min-w-50 max-w-60 min-h-10 input">
                <input className="input-primary border-0 outline-0" style={{fontSize: "12px"}} placeholder="search user..."/>
                <SearchIcon className="" />
            </div>
        </div>
    )
}