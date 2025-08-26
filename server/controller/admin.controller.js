import User from "../model/user.model.js";

// Toggle admin status for a user
export const toggleAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isAdmin } = req.body;
        
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Update the isAdmin field
        user.isAdmin = isAdmin;
        await user.save();
        
        res.status(200).json({ 
            message: `User admin status updated to ${isAdmin}`, 
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.log("Error updating admin status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users (for admin panel)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        console.log("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};