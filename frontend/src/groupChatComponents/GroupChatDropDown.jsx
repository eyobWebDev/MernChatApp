import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { JoystickIcon, MoreVertical } from "lucide-react";
import { useGroupChatStore } from "../states/useGroupChatStore";
import { useAuthStore } from "../states/useAuthStore";
import { useState, useEffect } from "react";

export default function GroupChatDropDown() {
    const {groupMembers, joinGroup, leaveGroup, getGroupMembers} = useGroupChatStore()
    const {authUser} = useAuthStore()
    const [isInGroup, setIsInGroup] = useState(null)

    useEffect(() => {
        getGroupMembers()
        setIsInGroup(groupMembers.some(member => member._id == authUser._id))
    }, [groupMembers]);

    const handleJoinGroup = async () => {
        await joinGroup()
        setIsInGroup(groupMembers.some(member => member._id == authUser._id))
    }
    const handleLeaveGroup = async () => {
        leaveGroup()
        setIsInGroup(groupMembers.some(member => member._id == authUser._id))    
    }
    
    return <>
    <DropdownMenu >
        <DropdownMenuTrigger asChild><MoreVertical /></DropdownMenuTrigger>
        <DropdownMenuContent  className={`w-40 text-base-content bg-base-200 border-0`} align='start'>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    {isInGroup ? <div onClick={handleLeaveGroup}>Leave group</div>:<div onClick={handleJoinGroup}>Join group</div>}
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div>
                        Add user
                    </div>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>Edit group</DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
}