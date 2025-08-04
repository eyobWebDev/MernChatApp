import { Edit2, MoreVertical, SwitchCamera } from "lucide-react";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut } from "./ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuItemIndicator } from "@radix-ui/react-dropdown-menu";
import { useAuthStore } from "../states/useAuthStore";
import { useNavigate } from "react-router-dom";


export default function ProfileDropDownMenu(){
    const {updateProfilePic} = useAuthStore()
    const navigate = useNavigate()
    
              
    const handleImageChange = async (e) => {
        console.log("image changed")
        const file = e.target.files[0]
        
        const reader = new FileReader()
        reader.readAsDataURL(file);
        
        reader.onload = async () => {
            const base64Image = reader.result
            setSelctedImage(base64Image)
            await updateProfilePic({profilePic: base64Image})
        }

    }

    return<>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <MoreVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`bg-base-200 text-base-content border-0`}>
            <DropdownMenuGroup>
                <DropdownMenuItem className={`w-40`}>
                    <div onClick={() => navigate("/profile/edit")} className="flex w-full items-center gap-3"><Edit2 /><div>Edit profile</div></div>
                </DropdownMenuItem>
                <DropdownMenuItem className={`w-40`}>
                    <div className="w-full gap-3">
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            id="fileInput"
                            onChange={handleImageChange}
                            />
                            <label className="flex gap-3 items-center" htmlFor="fileInput">
                            <SwitchCamera />
                            <div>Set profile pic</div>
                            </label>
                        </div>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
}