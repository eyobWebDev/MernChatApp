import {useAuthStore } from "../states/useAuthStore.jsx"
import {Loader } from "lucide-react"
import {useEffect } from "react"
import Header from "../components/Header.jsx"
import ChatUser from "../messagePages/ChatUser.jsx"
import ChatMessage from "../messagePages/ChatMessage.jsx"
import {Routes, Route, Navigate, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import GroupChatRoom from "../groupMessagesPage/GroupChatRoom.jsx"
import GroupChatList from "../groupMessagesPage/GroupChatList.jsx"
import CreateGroup from "../groupMessagesPage/CreateGroup.jsx"
import { useGroupChatStore } from "../states/useGroupChatStore.jsx"
import { useChatStore } from "../states/useChatStore.jsx"

export default function Homepage(){
    const {checkAuth} = useAuthStore()
    const navigate = useNavigate()
    const {users, getUsers} = useChatStore()

    useEffect(() => {
        checkAuth()
        
      getUsers()
    
    }, []);
    
    return(<>
     
        <Header />
        <Routes>
            <Route path="/users" element={<ChatUser />} />
            <Route path="/groups" element={<GroupChatList />} />
            <Route path="/groups/create" element={<CreateGroup />} />
            <Route path="/groups/:id/*" element={<GroupChatRoom />} />
        </Routes>
        </>
    )
}