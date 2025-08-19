import {create } from "zustand"
import toast from "react-hot-toast"
import {Axios} from "../utils/axios.js"
import {useAuthStore} from "./useAuthStore.jsx"
import { infoToaster } from "../components/toaster.jsx"
import { X } from "lucide-react"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,
    isEditingMessage: false,
    
    getUsers: async () =>{
        set({isUserLoading: true})
        try{
            const res = await Axios.get("api/messages/users")
            set({users: res.data})
        }catch(e){
            console.log("Error fetching all users", e)
            toast.error(e.response.data.message)
        } finally {
            set({isUserLoading: false})
        }
    },
    getMessages: async () =>{
        if(!get().selectedUser) return
        set({isMessagesLoading: true})
        try{
            const res = await Axios.get(`api/messages/${get().selectedUser._id}`)
            set({messages: res.data})
        }catch(e){
            console.log("Error fetching message", e)
            toast.error(e.response.data.message)
        }finally {
            set({isMessagesLoading: false})
        }
    },
    deleteMessage: (id) => {
        const newMessages = get().messages.filter(msg => msg._id != id)
        set({messages: newMessages})
        /* call an end point in the backend to remove it from database*/
    },
    sendMessage: async (data) =>{
        const { selectedUser } = get()
        if(!selectedUser) return
        set({isSendingMessage: true})
        set({messages: [...get().messages, {...data, createdAt: Date.now()}]})
        try{
            const res = await Axios.post(`api/messages/send/${get().selectedUser._id}`, data)
            
        }catch(e){
            console.log("Error sending message", e)
            toast.error(e.response.data.message)
        }finally {
            set({isSendingMessage: false})
        }
    },
    editMessage: async (data) => {
        const {selectedUser} = get()
        if (!selectedUser) return
        set({isEditingMessage: true})
        try {
            const res = await Axios.post(`api/messages/edit/${get().selectedUser._id}`, data)
        } catch (e) {
            console.log("Error sending message", e)
            toast.error(e.response.data.message)
        } finally {
            set({isEditingMessage: false})
        }
    },
    setSelectedUser: async (user) =>{
        set({selectedUser: user})
    },
    subscribeToMessage: async () => {
        const { selectedUser } = get()
        if(!selectedUser) return
        const socket = useAuthStore.getState().socket
        socket.on("newMessage", newMessage => {
            set({messages: [...get().messages, newMessage]})
            
        })
        socket.on("editMessage", newMessage => {
            get().messages.map(msg => {
                if(msg._id == newMessage._id){
                    msg.text = newMessage.text
                    msg.updatedAt = newMessage.updatedAt
                    msg.edited = true
                }
            })
        })
    },
    unsubscribeFromMessage: async () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    }
}))