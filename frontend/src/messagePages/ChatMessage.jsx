import {useChatStore } from "../states/useChatStore.jsx"
import {useAuthStore } from "../states/useAuthStore.jsx"
import MessageInput from "../components/MessageInput.jsx"
import ShowMessage from "../components/ShowMessage.jsx"
import defaultPicture from "../assets/Avatar.jpg"
import ShowUserInChat from "../components/ShowUserInChat.jsx"


export default function ChatMessage(){
    const {selectedUser } = useChatStore()
    const {onlineUsers } = useAuthStore()
    
    if(!selectedUser){
        return<div className="text-gray-400 flex-col flex justify-center items-center h-[80dvh]">
        <div>No user selected!</div>
        <div>Start chat with one of the users</div>
        </div>
    }

    
    return<div className="flex max-h-[80vh] flex-col justify-between">
    {/* chat message top part*/}
    
     <ShowUserInChat />
    
    {/* chat message top part ends */}
    
    <div className="w-full">
        {/* showing messages */}
        <div className="h-[60vh] overflow-scroll">
            <ShowMessage />
        </div>
        {/* showing message input */}
        <div className="message-input static w-full bottom-0">
          <MessageInput />
        </div>
    </div>
    
</div>
}