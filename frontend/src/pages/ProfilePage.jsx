import {User, Pen, Mail, Camera} from "lucide-react"
import {useAuthStore } from "../states/useAuthStore.jsx"
import {useState } from "react"

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
    
    return(
        <div className="flex border-s mt-32 flex-col m-3 p-3 justify-center items-center">
            <div className="relative flex justify-center items-center w-64 h-64 border-1 rounded-full">
            <div className="absolute flex justify-center items-center w-64 h-64 overflow-hidden border-1 rounded-full">
            
            <img src={authUser.profilePic || selctedImage || "/react.svg"} className="object-cover absolute w-full h-full img" /> 
            </div>
            
            <div className="absolute rounded right-5 bottom-5">
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="fileInput"
                onChange={handleImageChange}
                />
                <label htmlFor="fileInput">
                <Camera className="rounded p-1 w-8 h-8 bg-gray-600 "/>
                </label>
            </div>   
        
            </div>
            
            <div className="p-1 m-1 text-gray-500 text-center">
                <h2>Update your profile picture</h2>
            </div>
            
            
            <div className="w-4/5">
            {/* Full name input area*/}
        
            <div className=" text-gray-300">Full name</div>
            
            <div className="text-gray-400 relative mb-4">
            <User className="absolute z-10 left-3 top-2 w-5 h-5" />
                <div className="text-gray-100 input input-bordered w-full pl-10">{authUser.fullName}</div>
              </div>
              
            {/* Full name input area End*/}
            
            {/* Email input area*/}
            <div className=" text-gray-300">Email</div>
            
            <div className="text-gray-400 relative mb-4">
            <Mail className="absolute z-10 left-3 top-2 w-5 h-5" />
                <div className="text-gray-100 input input-bordered w-full pl-10">{authUser.email}</div>
              </div>
              
            {/* Email input area End*/}
            </div>
        </div>
    )
}