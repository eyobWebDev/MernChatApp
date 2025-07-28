import ShowUser from "../components/ShowUser"
import { useGroupChatStore } from "../states/useGroupChatStore"

export default function GroupMemberTab() {
    const {groupMembers} = useGroupChatStore()

    return <>
    <div className="h-[70vh]">
        {
            groupMembers.map(member => {
                return <>
                   <ShowUser user={member} />
                </>
            })
        }
    </div>
    </>
}