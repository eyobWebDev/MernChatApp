import {create} from "zustand"
import { Axios } from "../utils/axios.js"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore.jsx"

export const useGroupChatStore = create((set, get) => ({
    groupMessages: [],
    groupMembers: [],
    allGroups: [],
    selectedGroup: null,
    isGettingAllGroups: false,
    isGroupMessageLoading: false,
    groupMembersLoading: false,
    isCreatingGroup: false,
    joinGroupLoading: false,
    isGroupMember: false,
    isSendingMessage: false,

    
    //to creat a group expects: {name, description, isPublic, groupMembers} api/groups/create
    createGroup: async (data) => {
        set({isCreatingGroup: true})
        try {
            const res = await Axios.post("api/groups/create", data)
            if(res.status == 201){
                toast.success("You have succesfully created a group.")
                set({selectedGroup: res.data})
            } else {
                toast.error(res.data.message)
            }
            
        } catch (e) {
            console.log("Error in creating group", e)
            toast.error(e.response.data.message)
        } finally {
            set({isCreatingGroup: false})
        }
    },

    //to join a group expects: {groupId} posts to api/groups/join
    joinGroup: async () => {
        if(!selectedGroup) return
        set({joinGroupLoading: true})
        try {
            const res = await Axios.post("api/groups/join", {groupId: selectedGroup._id})
            if(res.status == 200){
                set({selectedGroup: res.data.group})
                toast.success(res.data.message)
            } else {
                toast.error("Cannot join group.")
            } 
            
        } catch (e) {
            console.log("Error in creating group", e)
            toast.error(e.response.data.message)
        } finally {
            set({joinGroupLoading: false})
        }
    },

    //to add user to a group expects: {groupId, userId} posts to api/groups/join/id
    addUser: async () => {

    },

    //to leave a group expects: {groupId} posts to api/groups/leave/id
    leaveGroup: async () => {
        

    },

    //expects id in parameter get request to api/groups/getAllMembers/:id
    getGroupMembers: async () => {
        const {selectedGroup} = get()
        set({groupMembersLoading: true})
        try {
            const res = await Axios.get("/api/groups/getAllMembers/"+selectedGroup._id)
            set({groupMembers: res.data.members});
            
        } catch (e) {
            console.log("Error in fetching group members", e)
            toast.error(e.response.data.message)
        } finally {
            set({groupMembersLoading: false})
        }
        
    },

    //to update a group expects: {groupId, name, isPublic, description} posts to api/groups/update/id
    updateGroupProfile: async () => {

    },

    //to delete a group expects: {groupId} posts to api/groups/delete/id
    deleteGroup: async () => {

    },

    //get all groups
    getAllGroups: async () => {
        set({isGettingAllGroups: true})
        try {
            const res = await Axios.get("api/groups/getAllGroups")
            set({allGroups: res.data})
            
        } catch (e) {
            console.log("Error in fetching all groups", e)
            toast.error(e.response.data.message)
        } finally {
            set({isGettingAllGroups: false})
        }
    }, 
    setSelectedGroup:  (group) => {
        set({selectedGroup: group})
    },

    //to get all messages with the group id
    getGroupMessages: async () => {
        const {selectedGroup} = get()
        set({isGroupMessageLoading: true})
        try {
            const res = await Axios.get(`api/groups/message/getMessage/${selectedGroup._id}`)
                set({groupMessages: res.data.messages})
        } catch (e) {
            console.log("Error in fetching all messages", e)
            toast.error(e.response.data.message) 
        } finally {
            set({isGroupMessageLoading: false})
        }
    },

    //to send message expects {content} post to api/groups/message/sendMessage
    sendMessage: async (data) => {    
        set({isSendingMessage: true})
        const {selectedGroup, groupMessages} = get()
        if (!selectedGroup) return
        //automatically add the data to the groupMessages list
       /* set({groupMessages: [...get().groupMessages, {
            senderId: useAuthStore.getState().authUser,
            content: data.content,
            createdAt: Date.now()
        }]}) */
        try {
            const res = await Axios.post(`api/groups/message/sendMessage/${selectedGroup._id}`, data) 
            
        } catch (e) {
            console.log("Error in sending message", e)
            toast.error(e.response.data.message) 
        } finally {
            set({isSendingMessage: false})
        }
    },
    subscribeToMessage: async () => {
        const {selectedGroup, groupMessages} = get()
        if (!selectedGroup) return
        const socket = useAuthStore.getState().socket
        socket.emit("join-group", selectedGroup._id)
        socket.on("new-group-message", newMessage => {
            set({groupMessages: [...get().groupMessages, newMessage]});
            console.log("newgroup message", newMessage);
        })

    },
    unsubscribeFromMessage: async () => {
        const {selectedGroup, groupMessages} = get()
        if (!selectedGroup) return
        const socket = useAuthStore.getState().socket
        socket.emit("leave-group", selectedGroup._id)
        socket.off("new-group-message")
    }
}))