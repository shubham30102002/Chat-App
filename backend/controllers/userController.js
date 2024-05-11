import User from "../models/user.js";


export const getUserForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        
        //get all user expect the logged in user
        //you can't send msg to yourself now
        //select is used to not show the password attribute
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}