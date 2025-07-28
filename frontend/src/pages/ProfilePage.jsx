import {User, Pen, Mail, Camera, SwitchCamera} from "lucide-react"
import {useAuthStore } from "../states/useAuthStore.jsx"
import {useState } from "react"
import ProfileInfoHeader from "../components/ProfileInfoHeader.jsx"
import { colors } from "../utils/colors.js"

export default function Profile(){
    const {authUser, updateProfile } = useAuthStore()
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
    
    return<>
    <ProfileInfoHeader isProfilePage={true} />
        <div className="h-1 bg-gray-600">
        </div>

        <div className="flex mt-2">
            <div className={`text-[${colors.primary}] font-bold`}>Groups</div>
        </div>
    </>
}