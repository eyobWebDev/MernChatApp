import { useState } from "react"
import { useAuthStore } from "../states/useAuthStore"
import { colors } from "../utils/colors"
import { Camera, SwitchCameraIcon , ArrowLeft, ArrowLeftCircleIcon, Edit, Edit2, MoreVertical, SwissFranc, SwitchCamera, ToggleLeft, ToggleLeftIcon, ToggleRight, ToggleRightIcon } from "lucide-react";
import defaultPicture from "../assets/Avatar.jpg"
import { useNavigate } from "react-router-dom";

export default function SettingsPageInfoHeader(){
    const {authUser, onlineUsers} = useAuthStore()
    const [selctedImage, setSelctedImage] = useState()
    const {updateProfile} = useAuthStore()
    const navigate = useNavigate()
         
    const handleImageChange = async (e) => {
        console.log("image changed")
        const file = e.target.files[0]
        
        const reader = new FileReader()
        reader.readAsDataURL(file);
        
        reader.onload = async () => {
            const base64Image = reader.result
            setSelctedImage(base64Image)
            await updateProfile({profilePic: base64Image})
        }

    }

 return <>
    <div className="relative p-3 pt-0 text-white">
        <div className={`rounded-2xl bg-[${colors.background}]  p-2`}>
            {/* editing and controls */}
            <div className="flex justify-between">
                <ArrowLeft className="cursor-pointer" onClick={() => navigate("/users")} size={30} />
                <div className="flex gap-6">
                    <Edit2 />
                    <MoreVertical />
                </div>

            </div>

            {/* profile */}
            <div className="mt-6 ms-1.5 flex gap-6 items-center">
                <div className=" relative w-15 h-15 rounded-full">
                    <img src={authUser.profilePic || defaultPicture} className="rounded-full absolute w-full h-full object-cover" />
                </div>
                <div className="">
                    <h4>{authUser.fullName?.split(" ")[0]}</h4>
                    {onlineUsers.includes(authUser) && <div style={{fontSize: "10px"}} className="text-gray-400">online</div>}
                </div>

            </div>
        </div> 
        <div className="absolute mt-3 rounded-full right-5 bottom-0">
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="fileInput"
                onChange={handleImageChange}
                />
                <label htmlFor="fileInput">
                <SwitchCameraIcon className="rounded-full p-1 w-8 h-8 bg-gray-600 "/>
                </label>
            </div> 
    </div>
 </>
}