import { useChatStore } from "../states/useChatStore"
import { useAuthStore } from "../states/useAuthStore"
import defaultPicture from "../assets/Avatar.jpg"
import { colors } from "../utils/colors"
import { ArrowLeft } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"


export default function ShowUserInChat() {
    const {selectedUser } = useChatStore()
    const {onlineUsers } = useAuthStore()
    const navigate = useNavigate()
   
    
        
   
    return <div className={`p-2`}>
        
    <div className={`rounded-2xl sticky flex p-1 items-center gap-3 mb-2`}>
        <ArrowLeft onClick={() => navigate(-1)} className="ml-3 cursor-pointer mb-2" />
        
        <div className="w-12 h-12 relative flex justify-center items-center rounded-full border overflow-hidden">
        <img src={selectedUser.profilePic || defaultPicture} className="absolute w-full h-full object-cover" />
        </div>
        
        <div className="hover:text-blue-400">
            <div className="hover:text-blue-400 active:text-blue-400">
                <h4 className="cursor-pointer">{selectedUser.fullName}</h4>
                {!onlineUsers.includes(selectedUser._id) ? <h6 style={{fontSize: "12px"}} className="text-gray-500">{selectedUser.email}</h6>: <span className="text-gray-100 p-1">online</span>}
            </div>
        
        </div>
        </div>

        <div className="h-1 bg-gray-600"></div>
    </div>
}