import {useChatStore } from "../states/useChatStore.jsx"
import ShowUser from "../components/ShowUser.jsx"
import UserLoadingSkeleton from "../components/UserLoadingSkeleton.jsx"
import {useEffect } from "react"

export default function ChatUser(){
    const {isUserLoading, users, getUsers} = useChatStore()
    
    useEffect(() => {

        if(users.length <= 1){
      getUsers()
    }
    }, [])
    
    
    const numberOfSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    if(isUserLoading){
       return(numberOfSkeleton.map(num => {
           return <UserLoadingSkeleton />
       }))
    }
    return <div>
    {users.map(user =>{
        return <ShowUser key={user._id} user={user} />
    })}
    </div>
}