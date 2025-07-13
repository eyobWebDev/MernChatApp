import { useState, useEffect } from 'react'
import {Axios } from "./utils/axios.js"
import {Routes, Route, Navigate } from "react-router-dom"
import Homepage from "./pages/Homepage.jsx"
import Signup from "./pages/SignupPage.jsx"
import Login from "./pages/LoginPage.jsx"
import Profile from "./pages/ProfilePage.jsx"
import Settings from "./pages/SettingsPage.jsx"
import {useAuthStore } from "./states/useAuthStore.jsx"
import {Toaster } from "react-hot-toast"
import NavBar from "./components/NavBar.jsx"
import {Loader } from "lucide-react"



function App() {
  const {isCheckingAuth, authUser, checkAuth, isLoggingOut, logout, onlineUsers} = useAuthStore()
    
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "dark")
      checkAuth()
    }, [])
    
    const Logout = () =>{
        logout()
    }
    if (isCheckingAuth || isLoggingOut){
        console.log("checking auth")
        return (
            <div className="fixed inset-0 flex justify-center items-center">
            <Loader size={64} className="animate-spin text-blue-500 h-6 w-6" />
            </div>
        )
    }
  
    return (
        <>
        <NavBar />
        <div className='md:m-52 md:mt-0 md:mb-0'>
        <Routes>
            <Route path="/*" element={authUser ? <Homepage /> : <Navigate to="/login" />}/>
            <Route path="/signup" element={!authUser?<Signup />: <Navigate to="/"/>}/>
            <Route path="/login" element={!authUser? <Login /> : <Navigate to="/" />}/>
            <Route path="/profile" element={authUser? <Profile /> : <Navigate to="/login" />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/logout" element={authUser ? <Logout /> : <Navigate to="/login" />}/>
        </Routes>
        </div>
        <Toaster />
    </>
    )
}

export default App
