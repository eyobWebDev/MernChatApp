import {create } from "zustand"
import {Axios} from "../utils/axios.js"
import toast from "react-hot-toast"
import {io } from "socket.io-client"

const BASEURL = import.meta.env.MODE == "development" ? "http://localhost:5001" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    searchedUser: [],
    isSearchingUser: false,
    
    checkAuth: async () => {
        try {
            const res = await Axios.get("/api/auth/check-auth")
            set({authUser: res.data})
            get().connectSocket()
        }catch (e){
            console.log("Error checking auth", e)
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup: async (data) => {
        set({isSigningUp: true})
        try{
            const res = await Axios.post("api/auth/signup", data)
            set({authUser: res.data})
            get().connectSocket()
            toast.success("Account created succesfully.")
        }catch (e){
        toast.error(e.response.data.message)
        } finally {
            set({isSigningUp: false})
        }
    },
    login: async (data) => {
        set({isLoggingIn: true})
        try{
            const res = await Axios.post("api/auth/login", data)
            set({authUser: res.data})
            get().connectSocket()
            toast.success("Logged in succesfully.")
        }catch (e){
        toast.error(e.response.data.message)
        } finally {
            set({isLoggingIn: false})
        }
    },
    logout: async () => {
        set({isLoggingOut: true})
        try{
            const res = await Axios.post("api/auth/logout")
            set({authUser: null})
            get().disconnectSocket()
            toast.success("Logged out succesfully.")
        }catch (e){
        toast.error(e.response.data.message)
        } finally {
            set({isLoggingOut: false})
        }
    },
    updateProfilePic: async (data) => {
        try{
            const res = await Axios.post("api/auth/update-profile-pic", data)
        
            if (res.status != 200){
                toast.error("Invalid data.")
            }
            set({authUser: res.data})
            toast.success("profile picture updated succesfully.")
        }catch (e){
            console.log("Error updating profile picture.", e)
            toast.error(e.response ?.data.message || "something went wrong.")
        }
    },
    updateProfile: async (data) => {
        try{
            const res = await Axios.post("api/auth/update-profile", data)
        
            if (res.status != 200){
                toast.error("Invalid data.")
            }
            set({authUser: res.data})
            toast.success("profile updated succesfully.")
        }catch (e){
            console.log("Error updating profile.", e)
            toast.error(e.response?.data.message || "something went wrong.")
        }
    },
    searchUser: async (query) => {
       
        set({isSearchingUser: true})
        try{
             const res = await Axios.get(`api/auth/search?q=${query}`)
                set({searchedUser: res.data})
        }catch (e){
            toast.error(e.response.data.message)
        } finally {
            set({isSearchingUser: false})
        }
    },
    connectSocket: async () => {
        const socket = io(BASEURL, {
            query: {
                userId: get().authUser._id,
            }
        })
        set({socket})
        socket.connect()
        socket.on("getOnlineUsers", userId => {
            set({onlineUsers: userId})
        })
    },
    disconnectSocket: async () => {
        if(get().socket?.connected) get().socket?.disconnect()
    }
}))