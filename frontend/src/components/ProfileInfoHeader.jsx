import { useAuthStore } from "../states/useAuthStore"
import { Camera, SwitchCameraIcon , ArrowLeft, ArrowLeftCircleIcon, Edit, Edit2, MoreVertical, SwissFranc, SwitchCamera, ToggleLeft, ToggleLeftIcon, ToggleRight, ToggleRightIcon } from "lucide-react";
import { colors } from "../utils/colors";
import { useState } from "react";
import ProfilePageInfoHeader from "./ProfilePageInfoHeader";
import SettingsPageInfoHeader from "./SettingsPageInfoHeader";

export default function ProfileInfoHeader({isProfilePage}){
    const {authUser, onlineUsers} = useAuthStore()
    const [selctedImage, setSelctedImage] = useState()
        
        
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
        <div className="mb-1.5 pb-3.5">
            {isProfilePage ? <ProfilePageInfoHeader /> : <SettingsPageInfoHeader />}
            

            {/* info */}
            <div className="p-2 flex flex-col gap-5">
                <h6 className={`text-[${colors.primary}] font-bold`}>info</h6>

                <div className="cursor-pointer">
                    <h4>{authUser.fullName}</h4>
                    <div style={{fontSize: "10px"}} className="text-gray-400">Full name</div>
                </div>

                <div className="cursor-pointer">
                    <h5>{authUser.email}</h5>
                    <div style={{fontSize: "10px"}} className="text-gray-400">Email</div>
                </div>
            </div>
        </div>
    </>
}