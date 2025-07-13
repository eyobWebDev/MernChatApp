import {Send , X, Image} from "lucide-react"
import {useState } from "react"
import toast from "react-hot-toast"
import {useParams } from "react-router-dom"
import {useGroupChatStore} from "../states/useGroupChatStore.jsx"
import { useAuthStore } from "../states/useAuthStore.jsx"

export default function MessageInput(){
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")
    const [imagePreviw, setImagePreview] = useState(false)
    const {id: recieverId} = useParams()
    const {sendMessage, selectedGroup} = useGroupChatStore()
    const {authUser} = useAuthStore()
    
    const handleCancelButton =  () => {
        setImagePreview(false)
        setImage("")
    }
    
    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImagePreview(true)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        
        reader.onload = async () => {
            const base64Image = reader.result
            setImage(base64Image)
        }
    }
    
    const handleSendMessage = async () => {
        if (message == "" && !image)return toast.error("You can't send empty message.")
        console.log(message)
        setMessage("")
        setImagePreview(false)
        //a functionality to send message
        await sendMessage({content: message, groupId: selectedGroup, senderId: authUser._id})
    }
    
    return<> 
    {imagePreviw && <div className="relative w-40 h-40 border rounded">
    <img src={image} className="absolute object-cover w-full h-full" />
    <span onClick={handleCancelButton} className="absolute p-1 right-0.5 top-0.5 rounded-full bg-neutral-950 text-white"><X /></span>
    </div>}
    <div className="flex p-3 mb-1 items-center gap-2">
    <label htmlFor="image-input">
    <Image size={32} />
    <input 
    type="file"
    className="hidden"
    id="image-input"
    accept="image/*"
    onChange={handleImageChange}
    />
    </label>
    <input 
    type="text"
    placeholder="Message..."
    className="input w-full p-2" 
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    />
    <Send onClick={handleSendMessage} size={32}/>
    </div>
    </>
}