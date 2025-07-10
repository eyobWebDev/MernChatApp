import {useAuthStore } from "../states/useAuthStore.jsx"
import {Loader } from "lucide-react"
import {useEffect } from "react"
import Header from "../components/Header.jsx"
import ChatUser from "../messagePages/ChatUser.jsx"
import ChatMessage from "../messagePages/ChatMessage.jsx"
import {Routes, Route } from "react-router-dom"
import NavBar from "../components/NavBar.jsx"
import GroupChatRoom from "../groupMessagesPage/GroupChatRoom.jsx"
import GroupChatList from "../groupMessagesPage/GroupChatList.jsx"
import CreateGroup from "../groupMessagesPage/CreateGroup.jsx"

export default function Homepage(){
    
    return(<>
     
        <Header />
        <Routes>
            <Route path="/users" element={<ChatUser />} />
            <Route path="/message/:id" element={<ChatMessage />} />
            <Route path="/groups" element={<GroupChatList />} />
            <Route path="/groups/create" element={<CreateGroup />} />
            <Route path="/groups/:id/*" element={<GroupChatRoom />} />
        </Routes>
        </>
    )
}