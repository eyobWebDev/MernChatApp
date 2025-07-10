import {useNavigate} from "react-router-dom"
import {useGroupChatStore} from "../states/useGroupChatStore"
import { FormatTime, FormatDate, isToday } from "../utils/FormatTime"

export default function GroupTile({group}) {
    const navigate = useNavigate()
    const {setSelectedGroup} = useGroupChatStore()
 

    const handleClick = () => {
        navigate("/groups/"+group._id)
        setSelectedGroup(group)
    }
    const name = group.name.split(" ")
    const first = name[0][0].toUpperCase()
    const second = name.length > 1 ? name[1][0].toUpperCase() : ""
    
   
    return <>
        <div onClick={handleClick} className=" p-3 flex m-2" style={{alignItems: "center"}}>

            <div style={{alignItems: "center"}} 
            className="mr-2 h-10 flex justify-center bg-purple-500 w-10 rounded-full text-center">
                <h1>{first + second}</h1>
            </div>

            <div>
                <div>
                    <h3>{group.name}</h3>
                </div>
                <hr className="w-100 mt-1.5 mb-1.5" />
                <div>
                    <div className="flex gap-4 text-2xl">
                        <FormatDate rawDate={group.createdAt} />
                    { isToday(group.createdAt) ?  <FormatTime rawDate={group.createdAt}  /> : ""} 
                    </div>
                </div>
            </div>
        </div>
    </>
}