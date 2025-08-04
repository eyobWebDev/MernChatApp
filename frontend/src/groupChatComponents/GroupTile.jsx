import {useNavigate} from "react-router-dom"
import {useGroupChatStore} from "../states/useGroupChatStore"
import { FormatTime, FormatDate, isToday } from "../utils/FormatTime"
import { colors } from "../utils/colors"

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
        <div onClick={handleClick} className="cursor-pointer border-b-2 border-gray-900 pb-2 flex" style={{alignItems: "center"}}>

            <div style={{alignItems: "center"}} 
            className={`mr-4 h-12 flex justify-center bg-[${colors.background}] custom-bg-color w-12 rounded-full text-center`}>
                <h1>{first + second}</h1>
            </div>

            <div>
                <div className={`cursor-pointer hover:text-[${colors.primary}] hover:text-blue-400 hover:custom-text-color mb-1`}>
                    <h3>{group.name}</h3>
                </div>
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