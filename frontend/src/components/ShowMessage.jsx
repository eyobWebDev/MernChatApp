import {useChatStore } from "../states/useChatStore.jsx"
import {useAuthStore } from "../states/useAuthStore.jsx"
import {useEffect } from "react"
import {FormatTime, FormatDate} from "../utils/FormatTime.jsx"

function getRandomNumbers(){
    let randomNumber = []
    for (let i = 0; i <= 4; i++){
        randomNumber.push(Math.floor(Math.random() * 10))
    }
    return randomNumber
}

export default function ShowMessage(){
    const {messages, isMessagesLoading, getMessages, subscribeToMessage, unsubscribeFromMessage} = useChatStore()
    const {authUser} = useAuthStore()
    
    useEffect(() => {
        getMessages()
        subscribeToMessage()
        
        return () => unsubscribeFromMessage()
    }, [])
    console.log("Messages: ", messages);
    
    
    const messagesNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const randomNumber = getRandomNumbers()
    if(isMessagesLoading){
         // show messsge skeleton 
       return <div className="flex-1  w-full overflow-y-auto space-y-2 mb-4">
        {messagesNumber.map((msg) => (
          <div
            className={`chat ${
              msg%2 === 0 ? "w-full chat-end" : "chat-start"
            }`}>
            <div className={`w-32 skeleton chat-bubble ${randomNumber.includes(msg) ? "w-32 h-10": "h-10"}`}></div>
          </div>
        ))}
      </div>
    }
    
    if(messages.length <= 0){
        return <div>No messages yet! </div>
    }
    
    const isToday = (value) => {
        const rawDate = new Date(value);
        const today = new Date();
        const result = rawDate.toDateString() === today.toDateString()
        return result
    }
    
    
    return <div className="">
    {messages.map(message => {
       return  <div className={`chat ${message.senderId == authUser._id ? "chat-end " : "chat-start"}`}>
       {/* to display images recieved from other user*/}
       {message.image && <div className="relative h-56 w-56 border rounded">
    <img src={message.image} className="absolute object-cover w-full h-full" />
    </div>}
    
       {/* to display text recieved from other user*/}
      {message.text && <div className={`chat-bubble text-gray-50 ${message.senderId == authUser._id ? "bg-blue-500" : "bg-gray-700"}`}>
        {message.text}
        <div className="flex gap-2">{!isToday(message.createdAt) && <FormatDate rawDate={message.createdAt} />}<FormatTime rawDate={message.createdAt} /></div>
      </div>
      }
    </div>
    })}
    </div>
}