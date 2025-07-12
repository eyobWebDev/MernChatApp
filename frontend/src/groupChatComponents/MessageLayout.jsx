import { useAuthStore } from "../states/useAuthStore"
import { FormatDate, FormatTime } from "../utils/FormatTime";
import defaultPicture from "../assets/Avatar.jpg"

export default function MessageLayout({message}) {
    const {authUser} = useAuthStore()

     const isToday = (value) => {
        const rawDate = new Date(value);
        const today = new Date();
        const result = rawDate.toDateString() === today.toDateString()
        return result
    }
    if(!message) {
        return <div>No messages yet!</div>
    }
    console.log('message', message);
    

    return <div>
        <div className={`chat ${message.senderId._id == authUser._id ? "chat-end " : "chat-start"}`}>
           

            {/* to display images recieved from other user*/}
            {/* message.image && <div className="relative h-56 w-56 border rounded">
        <img src={message.image} className="absolute object-cover w-full h-full" />
        </div> */}

            {/* to display text recieved from other users or my self*/}
            <div className="flex gap-2.5">
                <div>
                    {/* display the users profile in circle or the first two letters of their name or default picture */}
                    <div className="h-8 w-8 relative justify-center items-center rounded-full">
                        <img className="absolute object-cover w-full h-full" src={message.senderId.profilePic || defaultPicture} />
                    </div>
                </div>
 
                {message.content && <div className={`chat-bubble ${message.senderId._id == authUser._id ? "bg-blue-500" : "bg-gray-700"}`}>
                {message.content}
                <div className="flex gap-2">{!isToday(message.createdAt) && <FormatDate rawDate={message.createdAt} />}<FormatTime rawDate={message.createdAt} /></div>
                </div>}
                           
            </div>
        </div>

    </div>
}