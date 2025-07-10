import { useChatStore } from "../states/useChatStore"
import { useAuthStore } from "../states/useAuthStore"
import defaultPicture from "../assets/Avatar.jpg"


export default function ShowUserInChat() {
    const {selectedUser } = useChatStore()
    const {onlineUsers } = useAuthStore()
        
   
    return <div className="border-b sticky flex p-2 items-center gap-3 mb-5">
        <div className="w-14 h-14 relative flex justify-center items-center rounded-full border overflow-hidden">
        <img src={selectedUser.profilePic || defaultPicture} className="absolute w-full h-full object-cover" />
        </div>
        
        <div className="hover:text-blue-400">
            <div className="hover:text-blue-400 active:text-blue-400">
                <h4>{selectedUser.fullName}</h4>
                {!onlineUsers.includes(selectedUser._id) ? <h6 className="text-gray-500">{selectedUser.email}</h6>: <span className="text-gray-100 p-1">online</span>}
            </div>
        
        </div>
        </div>
}