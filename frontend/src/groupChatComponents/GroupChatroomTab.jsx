import { Tabs, TabsList, TabsContent, TabsTrigger } from "../components/ui/tabs";
import GroupMediaTab from "./GroupMediaTab";
import GroupMemberTab from "./GroupMemberTab";
import GroupMessageTab from "./GroupMessageTab.jsx";


export default function GroupChatroomTab() {

    return <>
        <Tabs>
            <TabsList className={`w-full`}>
                <div className="w-[70vw] flex justify-around">
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                </div>
            </TabsList>
            <TabsContent value="messages">
                <GroupMessageTab />
            </TabsContent>
            <TabsContent value="members">
                <GroupMemberTab />
            </TabsContent>
            <TabsContent value="media">
                <GroupMediaTab />
            </TabsContent>
        </Tabs>
    </>
}