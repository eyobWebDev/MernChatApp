 import { useGroupChatStore } from "../states/useGroupChatStore"
 import GroupTile from "../groupChatComponents/GroupTile"
 import { useEffect } from "react";
 import ChatRoomTab from "../groupChatComponents/ChatRoomTab";
import { Routes, Route, NavLink, useNavigate, useParams } from "react-router-dom";
import { MoreVertical, ArrowLeftIcon, LogIn } from "lucide-react";
import GroupMessageTab from "../groupChatComponents/GroupMessageTab";
import GroupMemberTab from "../groupChatComponents/GroupMemberTab";
import GroupMediaTab from "../groupChatComponents/GroupMediaTab";
import { useState } from "react";
import ShowMoreBox from "../groupChatComponents/ShowMoreBox";
import { useAuthStore } from "../states/useAuthStore";
import { colors } from "../utils/colors";
 
 export default function GroupChatRoom() {
    const {selectedGroup, getGroupMessages, getGroupMembers, groupMembers, subscribeToMessage, unsubscribeFromMessage} = useGroupChatStore()
    const {authUser, socket} = useAuthStore()
    const [showBox, setShowBox] = useState(false)
    
 

 useEffect(() => {
        getGroupMessages()
        getGroupMembers()
    }, []);
  
    


    if(!selectedGroup){
        return<div className="text-gray-400 flex-col flex justify-center items-center h-[80dvh]">
        <div>No Group selected!</div>
        <div>Tap on one of the groups to start messaging.</div>
        </div>
    }

   

    const handleMoreTab = () => {
        setShowBox(prevState => !prevState)
    }
    

    return <>
        <div className="">
                <div className="border-b-5 ml-3 border-gray-500">
                    <div className="flex justify-between items-center"> 
                            {/* show group profile*/}
                            <div className="flex ml-3 items-center"> 
                                <NavLink to="/groups">
                                    <ArrowLeftIcon />
                                </NavLink>
                                
                                <GroupTile group={selectedGroup} /> 
                            </div>
                

                        <div onClick={handleMoreTab}>
                            <MoreVertical />
                            <div className="absolute"> {showBox ? <ShowMoreBox /> : ""} </div>
                        </div>

                    </div>
                    <ChatRoomTab />
                </div>
             

            <div>
                <Routes>
                    <Route path="messages" element={<GroupMessageTab />}/>
                    <Route path="members" element={<GroupMemberTab />}/>
                    <Route path="media" element={<GroupMediaTab />}/>
                </Routes>
            </div>

            
        </div>
    </>

 }