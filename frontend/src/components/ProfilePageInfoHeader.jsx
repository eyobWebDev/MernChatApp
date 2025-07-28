import { useAuthStore } from "../states/useAuthStore"
import { Camera, SwitchCameraIcon , ArrowLeft, ArrowLeftCircleIcon, Edit, Edit2, MoreVertical, SwissFranc, SwitchCamera, ToggleLeft, ToggleLeftIcon, ToggleRight, ToggleRightIcon } from "lucide-react";
import { colors } from "../utils/colors";
import { useState } from "react";
import defaultImage from "../assets/Avatar.jpg"
import { useNavigate } from "react-router-dom";

export default function ProfilePageInfoHeader() {
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
    <div className={`relative p-3  rounded-2xl`}>
        <div className="flex justify-between">
                <ArrowLeft className="cursor-pointer" onClick={() => navigate('/users')} size={30} />
                <div className="flex gap-6">
                    <Edit2 />
                    <MoreVertical />
                </div>
        </div>

         <div className="relative flex justify-center items-center w-64 h-64 border-1 rounded-full">

            <div className="relative w-64 h-64  border-1 rounded-full">
            
            <img src={authUser.profilePic || selctedImage || defaultImage} className="object-cover rounded-full absolute w-full h-full" /> 
            </div>
            
            <div className={`absolute rounded-full right-5 bottom-5 bg-[${colors.background}]`}>
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="fileInput"
                onChange={handleImageChange}
                />
                <label htmlFor="fileInput">
                <SwitchCamera className={`rounded-full p-1 w-8 h-8`}/>
                </label>
            </div>   
        </div>

        <div className="p-1 m-1 text-gray-500">
            <h2>Update your profile picture</h2>
        </div>
    </div>

    
    </>
}