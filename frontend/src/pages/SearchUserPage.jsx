import { useAuthStore } from "../states/useAuthStore.jsx"
import {ArrowLeft, ImportIcon, Loader, SearchIcon} from "lucide-react"
import { useState } from "react"
import defaultPicture from "../assets/Avatar.jpg"
import highlightMatch from "../utils/highlightMatch.jsx"
import { useNavigate } from "react-router-dom"

export default function SearchUserPage() {
    const [query, setQuery] = useState("")
    const {searchUser, searchedUser, isSearchingUser} = useAuthStore() 
    const naviagte = useNavigate()
    
    const handleSearchUser = async () => {
        await searchUser(query)
    }
    return <div className="">
        <div className="flex p-2 gap-4 items-center bg-base-200 rounded-b-2xl">
            <ArrowLeft onClick={() => naviagte(-1)} className=""/>
            <div className="p-3 w-full flex items-center bg-base-200 justify-between input">
                    <input
                    className="input-primary border-0 outline-0" 
                    style={{fontSize: "12px"}} 
                    placeholder="Search user..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <SearchIcon onClick={handleSearchUser} className="cursor-pointer" />
            </div>
        </div>
        <div className="mt-2">
            {isSearchingUser && <div className="h-full w-full flex justify-center items-center">
                <Loader />
            </div>}
            {searchedUser && searchedUser.map(user => {
                return <div key={user._id} className="p-2 flex gap-4 items-center border-b border-gray-500">
                    <div className="h-10 w-10 relative rounded-full">
                        <img src={user.profilePic || defaultPicture} className="absolute w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                        <div style={{fontSize: "14px"}} className="">{user.fullName}</div>
                        <div style={{fontSize: "10px"}} className="text-gray-500">{user.email}</div>
                    </div>
                </div>
            })}
            
        </div>
    </div>
}