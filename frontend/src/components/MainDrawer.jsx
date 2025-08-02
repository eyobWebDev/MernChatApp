import { useAuthStore } from "../states/useAuthStore.jsx"
import {Drawer, DrawerTrigger, DrawerHeader, DrawerContent, DrawerDescription, DrawerOverlay} from "./ui/drawer.jsx"
import { Menu, MoonIcon, PlusCircle, SettingsIcon, SunIcon, UserCircle } from "lucide-react"
import defaultPicture from "../assets/Avatar.jpg"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function MainDrawer() {
    const {authUser} = useAuthStore()
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



    return <Drawer direction="left">
        <DrawerTrigger asChild>
            <Menu size={20} />
        </DrawerTrigger>

        <DrawerContent  className="bg-base-200 p-0 text-base-content">
            <DrawerHeader className={`bg-base-300 flex flex-col gap-3 justify-between pt-3 pb-3`}>
                    <div className="flex justify-between p-1">
                        <div className="h-15 relative w-15 rounded-full">
                            <img className="absolute w-full h-full rounded-full object-cover" src={authUser.profilePic || defaultPicture} />
                        </div>
                        <div onClick={toggleDarkMode}>
                            {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        </div>

                    </div>
                    <div className="">
                        <h4 style={{fontSize: "15px"}}>{authUser.fullName?.split(" ")[0]}</h4>
                        <h6 style={{fontSize: "12px"}} className="text-gray-400 ">{authUser.email}</h6>
                    </div>

            </DrawerHeader>

            <div className={`flex w-full flex-col`}>
                <div className="flex p-5 flex-col gap-4 border-b-4 pb-3 border-gray-900">
                    <Link to="/profile" className="flex gap-5"><UserCircle className="text-gray-400 rounded-full p-0.5"/><div>My Profile</div></Link>
                    <Link to="/group/create" className="flex gap-5"><PlusCircle className="text-gray-400 rounded-full p-0.5"/><div>Create group</div></Link>
                </div>
                <div className="flex p-5 flex-col gap-4">
                    <Link to="/settings" className="flex gap-5"><SettingsIcon className="text-gray-400 rounded-full p-0.5"/><div>Settings</div></Link>
                    <Link to="/logout" className="flex gap-5"><button className="btn pl-9 pr-9">Log out</button></Link>
                </div>
            </div>


        </DrawerContent>
    </Drawer>
}
