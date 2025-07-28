import {ToggleLeftIcon, ToggleRightIcon } from "lucide-react";
import { colors } from "../utils/colors";
import { useAuthStore } from "../states/useAuthStore";
import ProfileInfoHeader from "../components/ProfileInfoHeader";



export default function Settings(){
    const {authUser, onlineUsers} = useAuthStore()
    let isDarkMode = document.documentElement.getAttribute("data-theme") == "dark"

    

    const toggleDarkMode = () => {
        isDarkMode = !isDarkMode
        
        if(document.documentElement.getAttribute("data-theme") == "dark"){
            document.documentElement.setAttribute("data-theme", "light")
        } else {
            document.documentElement.setAttribute("data-theme", "dark")
        }
    }
    
    return<>
        <div>
            <ProfileInfoHeader />

            {/* settings */}
            <div className="h-1 rounded bg-gray-600">

            </div>
            <div className="mt-2 flex flex-col gap-8">
                <h6 className={` text-[${colors.primary}] font-bold`}>Settings</h6>

                {/* individual settings */}
                <div className="p-2 flex justify-between shadow-lg">
                    <div>Dark Mode</div>
                    <div onClick={toggleDarkMode}>
                        {isDarkMode ? <ToggleRightIcon /> : <ToggleLeftIcon />}
                    </div>
                </div> 

            </div>

        </div> 
    </>

}