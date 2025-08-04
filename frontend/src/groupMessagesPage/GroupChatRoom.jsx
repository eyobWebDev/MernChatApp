 import { useGroupChatStore } from "../states/useGroupChatStore"
 import GroupTile from "../groupChatComponents/GroupTile"
 import { useEffect } from "react";
 import ChatRoomTab from "../groupChatComponents/ChatRoomTab";
import { Routes, Route, NavLink, useNavigate, useParams, Outlet } from "react-router-dom";
import { MoreVertical, ArrowLeftIcon, LogIn } from "lucide-react";
import GroupMessageTab from "../groupChatComponents/GroupMessageTab";
import GroupMemberTab from "../groupChatComponents/GroupMemberTab";
import GroupMediaTab from "../groupChatComponents/GroupMediaTab";
import { useState } from "react";
import { useAuthStore } from "../states/useAuthStore";
import { colors } from "../utils/colors";
import GroupChatDropDown from "../groupChatComponents/GroupChatDropDown.jsx";
import GroupChatroomTab from "../groupChatComponents/GroupChatroomTab.jsx";
 
 export default function GroupChatRoom() {
    const {selectedGroup, getGroupMessages, getGroupMembers} = useGroupChatStore()
    const navigate = useNavigate()

 useEffect(() => {
        getGroupMessages()
        getGroupMembers()
    }, []);

    const handleGoBack = () => {
        navigate("/groups")
    }
  
    


    if(!selectedGroup){
        return<div className="p-2">
            <ArrowLeftIcon onClick={() => navigate('/groups')} />
        <div className="text-gray-400 flex-col flex justify-center items-center h-[80dvh]">
        <div>No Group selected!</div>
        <div>Tap on one of the groups to start messaging.</div>
        </div>
        </div>
    }

    return <>
        <div className="">
                <div className="sticky">
                    <div className="flex relative justify-between items-center"> 
                        {/* show group profile*/}
                        <div className="flex gap-3 p-2 items-center"> 
                            <ArrowLeftIcon onClick={handleGoBack}/>
                            <GroupTile group={selectedGroup} /> 
                        </div>
                
                        <GroupChatDropDown />
                            
                    </div>
                </div>
             

            <div className="">
                <GroupChatroomTab />
            </div>

            
        </div>
    </>

 }