import {Plus, SearchIcon, Settings, User, UserCheck2 } from "lucide-react"
import {Link, useNavigate } from "react-router-dom"
import {useAuthStore } from "../states/useAuthStore.jsx"
import { colors } from "../utils/colors.js"
import MainDrawer from "./MainDrawer.jsx"
import Header from "./Header.jsx"

export default function NavBar(){
    const {authUser } = useAuthStore()
    const navigate = useNavigate()
    
    return(<div className="text-base-content flex flex-col gap-3 bg-base-200">
         <div className="flex items-center text-[15px] sm:text-base border-gray-400 pl-1.5 pr-1.5 pt-2 pb-2 justify-between">
            <div className="flex items-center">
                <MainDrawer />
                <h4 className="ml-2.5 not-sm:text-[12px]"><Link to="/">Chat app</Link></h4>
            </div>

            <div className="p-3 flex items-center justify-between ">
                {/*<input className="input-primary border-0 outline-0" style={{fontSize: "12px"}} placeholder="search user..."/>*/}
                <SearchIcon onClick={() => navigate("/users/search")} className="cursor-pointer" />
            </div>
        </div>
        <Header />
    </div>
       
    )
}