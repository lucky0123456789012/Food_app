import { User } from '../models/userModel.js';
const getUserController = async (req, res) => {
    try {
        
        //  
        // Ensure req.user is defined before accessing id
        if (!req.user || !req.user.id) {
            return res.status(400).send({
                success: false,
                message: "User ID is missing in the request",
            });
        }

        const userId = req.user.id; // Directly access id from req.user

        // Fetch user data from MongoDB using the extracted user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "User data retrieved successfully",
            user,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send({
            success: false,
            message: "Error fetching user data",
            error: error.message,
        });
    }
};
//Update
const updateUserController = async (req, res)=>{
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).send({
                success: false,
                message: "User ID is missing in the request",
            });
        }
        const userId = req.user.id; // Access the user ID from req.user

        // Fetch user data from MongoDB using the extracted user ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }

        //Extract and then Update 
        const {userName, address, phone, userType } = req.body;
          
        // Update the user data
          if (userName) user.userName = userName;
          if (address) user.address = address;
          if(phone) user.phone = phone;
          if(userType) user.userType = userType;
         
        //Save the data
          await user.save();

          res.status(200).send({
              success: true,
              message: "User data updated successfully",
              user,
          });

    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send({
            success: false,
            message: "Error updating user data",
            error: error.message,
        });
    }
}

const deleteUserController = async (req, res)=>{
    try {
        console.log(req.user.userType);
        if(!req.user || req.user.userType !== "admin"){
            return res.status(403).send({
                success: false,
                message: "Access denied. Only admins can delete users."
            });             
        }
        // Proceed with deletion
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "your account is deleted"
        });

    } catch (error) {
        console.error("Error in deleting the user", error);
        res.status(500).send({
            success: false,
            message: "Error deleting the user data",
            error: error.message
        })
    }
}

export {getUserController, updateUserController, deleteUserController};