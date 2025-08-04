import { useAuthStore } from "../states/useAuthStore";
import { ArrowLeftIcon, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
    const navigate = useNavigate()
    const {authUser, updateProfile} = useAuthStore()
    const [firstName, setFirstName] = useState(authUser?.fullName.split(' ')[0])
    const [lastName, setLastName] = useState(authUser?.fullName.split(' ')[1] == "undefined" ? "" : authUser?.fullName.split(' ')[1])
    const [email, setEmail] = useState(authUser?.email)

    const handleEditProfile = async () => {
        const fullName = `${firstName} ${lastName}`
        await updateProfile({fullName, email})
        navigate('/profile')
    }

    return <>
    <div className="p-5 rounded-b-box bg-base-200 flex justify-between"><ArrowLeftIcon className="cursor-pointer" onClick={() => navigate(-1)} /><Check className="cursor-pointer" onClick={handleEditProfile} /></div>

    <div className="form p-3">
        <div className="flex pb-4 mb-4 flex-col">
            <div style={{fontSize: ".8rem"}} className="custom-text-color font-bold">Full name</div>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input w-full mb-3 focus:outline-0 outline-0 border-b" />
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="input w-full border-0 focus:outline-0 outline-0 border-b" />
        </div>
        
        <div className="flex pb-4 flex-col">
            <h6 style={{fontSize: ".8rem"}} className="custom-text-color font-bold">Email</h6>
            <input value={`${email}`} onChange={(e) => setEmail(e.target.value)} className="input w-full mb-3 focus:outline-0 outline-0 border-b" />
            
        </div>

    </div>
    </>
}