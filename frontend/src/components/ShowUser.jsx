import {NavLink, useActionData, useLoaderData, useLocation, useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom"
import {useChatStore } from "../states/useChatStore.jsx"
import {useAuthStore } from "../states/useAuthStore.jsx"
import defaultPicture from "../assets/Avatar.jpg"

function generateRandomNumber(){
    return Math.floor(Math.random() * 4)
}

export default function ShowUser({user}){
    const {setSelectedUser } = useChatStore()
    const {onlineUsers, authUser } = useAuthStore()
    
    const handleUserClick = () => {
        setSelectedUser(user)
        console.log(authUser, user);
        
    }

    const color = ["yellow", "blue", "green", "red"]
    const randomColor = color[generateRandomNumber()]
    
    return<div className="border-b-2 border-gray-900 flex p-3 items-center gap-3">
    {/* display profile pic */}
    <div className={`relative w-10 h-10 flex justify-center items-center rounded-full`}>
    <div className={`relative w-10 overflow-hidden h-10 flex justify-center items-center rounded-full border`}>
    <img className="absolute object-cover w-full h-full" src={user.profilePic || defaultPicture} />
    </div>
    <span className={`${onlineUsers.includes(user._id)? "p-1.5 rounded-full bg-green-600": ""} absolute bottom-0 right-0`}></span>
    </div>
    
    <div onClick={handleUserClick} className="hover:text-blue-400">
    <NavLink className="hover:text-blue-400 active:text-blue-400" to={authUser._id == user._id ? `/profile` : `/message/${user._id}`} >
    <h6>{user.fullName}</h6>
    <p style={{fontSize: "13px"}} className="text-gray-500">{user.email}</p></NavLink></div>
    </div>
}