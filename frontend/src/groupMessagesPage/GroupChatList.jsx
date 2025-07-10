import { useEffect } from "react"
import { useGroupChatStore } from "../states/useGroupChatStore"
import GroupTile from "../groupChatComponents/GroupTile"
import UserLoadingSkeleton from "../components/UserLoadingSkeleton"

export default function GroupChatList(){
    const {allGroups, getAllGroups, isGettingAllGroups} = useGroupChatStore()

    useEffect(() => {
       if(allGroups.length <= 1){
        getAllGroups()
       }
        
    }, [])
    
    const numberOfSkeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    if(isGettingAllGroups){
        return(numberOfSkeleton.map(num => {
            return <UserLoadingSkeleton />
        }))
    }
    console.log(allGroups);
    

    return<>
    <div className="border-l m-2">
       {allGroups.map(group => {
        return <GroupTile group={group} />
       })
       }
       </div>
    </>
}