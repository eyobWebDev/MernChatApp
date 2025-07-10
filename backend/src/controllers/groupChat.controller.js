import GroupChat from "../models/groupChat.model.js"

//to create a group in the GroupChat models
export const createGroup = async (req, res) => {
    const {name, description, isPublic} = req.body 
    try {
        if(!name) return res.status(400).json({message: "A group should have a name."})
        
        const admin = req.user._id
        const members = [admin]
        const newGroup = new GroupChat({
            name, members, admin, description, isPublic
        })

        if(newGroup){
            await newGroup.save()
            res.status(201).json(newGroup)
        } else {
            res.status(400).json({message: "Error creating the group."})
        }
        
    } catch (e) {
       console.log("Error in createGroup ", e.message) 
       res.status(500).json({message: "Internal server error"})
    }
}

//to get all members from the GroupChat model
export const getAllMembers = async (req, res) => {
   const {id: groupId} = req.params
   try {
    const group = await GroupChat.findById({_id: groupId}).populate("members", "fullName email profilePic").populate("admin", "fullName email profilePic")
    if(!group) return res.status(400).json({message: "Could not find a group with that name."})
    res.status(200).json(group)
    
   } catch (e) {
    console.log("Error in getting all group memebers", e.message)
    res.status(500).json({message: "Internal server error."})
   } 
}

//join group
export const joinGroup = async (req, res) => {
    const {groupId} = req.body

    try {
        const group = await GroupChat.findById({_id: groupId})
        if(!group) return res.status(400).json({message: "Could not find a group with that name."})
        const updatedGroup = await GroupChat.findByIdAndUpdate({_id: groupId}, 
            {$addToSet: {members: req.user._id}},
            {
                new: true,
                runValidators: true
            }
        ).populate("members", "fullName email profilePic").populate("admin", "fullName email profilePic")

        res.status(200).json({group: updatedGroup, message: "Succesfully joined the group."})
    } catch (e) {
        console.log("Errror in joinGroup controller.", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

//leave group
export const leaveGroup = async (req, res) => {
    const {groupId} = req.body
    try {
        const userId = req.user._id
        const group = await GroupChat.findById({_id: groupId})
        if(group && userId.toString() == group.admin.toString()) {
            //delete the group if the user is the admin
            await GroupChat.findByIdAndDelete({_id: groupId})
        }

        if(group){
            const updatedGroup = await GroupChat.findByIdAndUpdate(
                {_id: groupId},
                {$pull: {members: userId}},
                {new: true}
            ).populate("members", "fullName email profilePic").populate("admin", "fullName email profilePic")
            res.status(200).json({group: updatedGroup, message: "Succesfully left the group."})
        } else {
            res.status(404).json({message: "Group not found."})
        }

    } catch (e) {
        console.log("Error in leaveGroup controller", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

//edit the group profile
export const updateGroupProfile = async (req, res)=> {
    const {groupId, name, isPublic, description} = req.body
    try {
        const isAdmin = req.user._id.toString() == group.admin.toString()
        if (isAdmin) {
            const group = await GroupChat.findByIdAndUpdate({_id: groupId}, 
            {name, isPublic, description}, {new: true}
            )
            res.status(200).json({group, message: "Successfully updated Group profile."})
        } else {
            res.status(403).json({message: "Forbidden: only admin can update group profile."})
        }
        
  
    } catch (e) {
        console.log("Error in updateGroupProfile controller", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

//delete group
export const deleteGroup = async (req, res) => {
    const {groupId} = req.body
    try {
        const group = await GroupChat.findById({_id: groupId})
        const isAdmin = req.user._id.toString() == group.admin.toString()
        if(group && isAdmin){
            await GroupChat.findByIdAndDelete({_id: groupId})
            res.status(200).json({message: 'Deleted the group succesfully.'})
        } else {
            return res.status(403).json({message: "Forbidden: only admin can delete a group."})
        }
        
    } catch (e) {
        console.log("Error in deleteGroup controller.", e.message)
        res.status(500).json({message: "Internal server error."})
    }
}

export const getAllGroups = async (req, res) => {
    try {
        const allgroups = await GroupChat.find()
        res.status(200).json(allgroups)
        
    } catch (e) {
        console.log("Error in gettingAllGroups controller.", e.message)
        res.status(500).json({message: "Internal server error."})
    } 
}