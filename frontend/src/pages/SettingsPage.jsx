import {ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { colors } from "../utils/colors";
import { useAuthStore } from "../states/useAuthStore";
import ProfileInfoHeader from "../components/ProfileInfoHeader";
import { useState, useEffect } from "react";



export default function Settings(){
    const {authUser, onlineUsers} = useAuthStore()
    const [isDarkMode, setIsDarkMode] = useState(null)

    useEffect(() => {
        const value = document.documentElement.getAttribute("data-theme") == "dark"
        setIsDarkMode(value)
    }, [])

    const toggleDarkMode = () => {
        if(isDarkMode){
            document.documentElement.setAttribute("data-theme", "light")
            setIsDarkMode(false)
        } else {
            document.documentElement.setAttribute("data-theme", "dark")
            setIsDarkMode(true) 
        }
    }

    
    return<>
        <div>
            <ProfileInfoHeader />

            {/* settings */}
            <div className="h-1 rounded bg-gray-600">

            </div>
            <div className="mt-2 flex flex-col gap-8">
                <h6 className={` text-[${colors.primary}] custom-text-color font-bold`}>Settings</h6>

                {/* individual settings */}
                <div className="p-2 flex justify-between shadow-lg">
                    <div>Dark Mode</div>
                    <div onClick={toggleDarkMode}>
                        {isDarkMode ? <ToggleRightIcon size={30} /> : <ToggleLeftIcon size={30} />}
                    </div>
                </div> 

            </div>

        </div> 
    </>

}