import { GroupIcon, NotepadText, PencilIcon , Loader, LucideConstruction} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGroupChatStore } from "../states/useGroupChatStore";
import toast from "react-hot-toast";

 export default function CreateGroup(){
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(true)
    const {isCreatingGroup, createGroup, selectedGroup} = useGroupChatStore()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(name == "") return toast.error("Connot create a group without a name.")
        
        await createGroup({name, description, isPublic})
        if(selectedGroup){
            navigate("/groups/"+selectedGroup._id)
        } 
    }

    return<div className="ml-2.5 mt-5 border-l border-l-white">
        <div className="flex gap-1.5 flex-col mt-2" style={{alignItems: "center"}}>
            <div><GroupIcon /></div>
            <div><h4>Create a group!</h4></div>
        </div>

        {/* create group input are part   */}
        <div className="form-group ml-3">
            <form  onSubmit={handleSubmit}>
                {/* name input area*/}
                <label>
                <span className="label-text text-gray-300">Name</span>
                </label>
                <div className="text-gray-300 relative mb-4 mt-2">
                <NotepadText className="absolute z-10 left-3 top-2 w-5 h-5" />
                    <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g weatherGroup"
                    className="input input-bordered w-full pl-10"
                    />
                </div>

                {/* description input area*/}
                <label>
                <span className="label-text text-gray-300">Description</span>
                </label>
                <div className="text-gray-300 relative mb-4">
                <PencilIcon className="absolute z-10 left-3 top-2 w-5 h-5" />
                    <textarea
                    name="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="E.g write a bit about your group..."
                    className="input input-bordered w-full pl-10 flex mt-2 h-28"
                    style={{resize: "none"}}
                    ></textarea>
                </div>

                {/* isPublic input area*/}
                <div className="border p-2 border-gray-600 rounded mb-3.5">
                     
                    <div className="flex gap-2">
                        <input 
                        type="radio" 
                        name="option" 
                        value="public"
                        onChange={(e) => setIsPublic(true)} 
                        />
                    <label>
                        <span className="label-text text-gray-300">Public</span>
                    </label>
                    </div>

                    <div className="flex gap-2">
                        <input 
                        type="radio" 
                        name="option"
                        value="private"
                        onChange={(e) => setIsPublic(false)} 
                        />
                    <label>
                        <span className="label-text text-gray-300">Private</span>
                    </label>
                    </div>
                    
                </div>

                {/* create button area*/}
                <div>
                    <button disabled={isCreatingGroup} type="submit" className="btn w-full">
                    {isCreatingGroup ? <Loader className="animate-spin text-blue-500 h-6 w-6" />: "Create"}
                    </button>
                </div>
            </form>
        </div>

    </div>
 }